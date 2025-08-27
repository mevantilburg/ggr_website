/**
 * Update Parser - Client-side renderer for blog updates from Markdown files
 * With status filtering capability
 */

class UpdateParser {
  constructor() {
    this.updateContainer = document.getElementById('blog');
    this.updates = [];
    this.baseUrl = '/updates/'; // Folder containing the markdown files
    // List of update files - must be maintained manually for GitHub Pages
    this.updateFiles = ['1.md', '2.md', '3.md', '4.md', '5.md', '6.md', '7.md', '8.md', '9.md', '10.md', '11.md', '12.md', '13.md', '14.md', '15.md']; // Add your files here
  }

  /**
   * Initialize the parser and load updates
   */
  async init() {
    try {
      // Show loading message
      this.updateContainer.innerHTML = '<div class="section"><div class="text_section"><p>Loading updates...</p></div></div>';

      // Process each update file
      for (const file of this.updateFiles) {
        const update = await this.fetchAndParseUpdate(file);
        if (update && update.metadata.status === 'live') {
          this.updates.push(update);
        }
      }

      // Sort updates by day number in descending order (newest first)
      this.updates.sort((a, b) => {
        const dayA = parseInt(a.metadata.day || '0', 10);
        const dayB = parseInt(b.metadata.day || '0', 10);
        return dayB - dayA;
      });

      // Render all updates
      this.renderUpdates();
      // Deep-link support (hash or ?day=)
      this.setupDeepLinks();
    } catch (error) {
      console.error('Failed to load updates:', error);
      this.updateContainer.innerHTML = '<div class="section"><div class="text_section"><p>Error loading updates. Please try again later.</p></div></div>';
    }
  }

  /**
   * Fetch and parse a single update file
   */
  async fetchAndParseUpdate(filename) {
    try {
      const response = await fetch(this.baseUrl + filename);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.status}`);
      }

      const markdownContent = await response.text();
      return this.parseMarkdown(markdownContent, filename);
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return null;
    }
  }

  /**
   * Parse markdown content into structured data
   */
  parseMarkdown(content, filename) {
    // Split the content into frontmatter and body
    const parts = content.split('---');

    if (parts.length < 3) {
      console.error(`Invalid markdown format in ${filename}`);
      return null;
    }

    // Parse frontmatter
    const frontmatter = parts[1].trim().split('\n');
    const metadata = {};

    frontmatter.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        metadata[key] = value;
      }
    });

    // Default status to draft if not specified
    if (!metadata.status) {
      metadata.status = 'draft';
    }

    // Parse body content
    const bodyContent = parts.slice(2).join('---').trim();

    // Parse markdown to HTML (using a simple parser)
    const htmlContent = this.markdownToHtml(bodyContent);

    return {
      id: parseInt(filename.replace('.md', ''), 10),
      metadata,
      content: htmlContent
    };
  }

  /**
 * Simple markdown to HTML converter with inline image support
 */
  markdownToHtml(markdown) {
    // Split into paragraphs
    const paragraphs = markdown.split(/\n\n+/);

    return paragraphs.map(paragraph => {
      if (!paragraph.trim()) return '';

      // Process all inline elements, including images
      let content = paragraph
        // Handle images: ![alt text](image-url)
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="blog-image">')
        // Handle links: [text](url)
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        // Handle bold: **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Handle italics: *text*
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Only wrap in paragraph tags if it's not just an image
      if (paragraph.trim().startsWith('![') &&
        paragraph.trim().match(/^!\[.*?\]\(.*?\)$/) !== null) {
        // This is a standalone image, don't wrap in paragraph
        return content;
      } else {
        // This has text or is a mixed paragraph, wrap in paragraph tags
        return `<p>${content}</p>`;
      }
    }).join('\n');
  }
  /**
   * Render all updates to the page
   */
  renderUpdates() {
    // Clear existing content
    this.updateContainer.innerHTML = '';

    if (this.updates.length === 0) {
      this.updateContainer.innerHTML = '<div class="section"><div class="text_section"><p>No updates available yet.</p></div></div>';
      return;
    }

    this.updates.forEach(update => {
      const updateHtml = this.createUpdateHtml(update);
      this.updateContainer.innerHTML += updateHtml;
    });
  }

  /**
   * Create HTML for a single update
   */
  createUpdateHtml(update) {
    const { metadata, content } = update;

    // Check if required metadata exists
    const day = metadata.day || '?';
    const date = metadata.date || 'Date not available';
    const theme = metadata.theme || 'No theme';
    const weatherIcon = this.getWeatherIcon(metadata.weather || '');
    // Format the video embed if present
    const videoEmbed = metadata.route_video ?
      `<div class="section">
        <div class="image_section">
          <iframe class="blog-iframe" width="100%" 
            src="https://www.youtube.com/embed/${metadata.route_video}?si=yBRCrbw-We7mh596&rel=0&modestbranding=1&showinfo=0" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>` : '';

    return `
      <section id="day${day}" class="update_section">  
    <div class="section">
        <div class="text_section">
          <div class="blog_header">
            <div class="blog_date">Day ${day}, ${date}</div>
           
            <div class="blog_subtitle">Theme: ${theme}</div>
                <a class="permalink" href="#day${day}" title="Copy link to this update">#</a>
        
             <div class="blog_meta">
              <div class="blog_columnleft">
                <div class="blog_metaline"> <img class="meta_icon" src="img/start.svg"> <span>from </span>${metadata.from || '?'}</div>
              </div>
              <div class="blog_columnleft">
                <div class="blog_metaline"> <img class="meta_icon" src="img/finish.svg"> <span>to </span>${metadata.to || '?'}</div>
              </div>
            </div>
            <div class="blog_meta">
              <div class="blog_columnleft">
                <div class="blog_metaline"> <img class="meta_icon" src="img/${weatherIcon}">${metadata.weather || 'N/A'}</div>
                <div class="blog_metaline"> <img class="meta_icon" src="img/temp.svg">${metadata.temp || '?'} <span>celcius</span></div>
                <div class="blog_metaline"> <img class="meta_icon" src="img/dist.svg">${metadata.distance || '?'} <span>km distance</span></div>
                <div class="blog_metaline"> <img class="meta_icon" src="img/alt.svg">${metadata.gain || '?'} <span>m elevation gain</span></div>
              </div>
              <div class="blog_columnleft">
                <div class="blog_metaline"> <img class="meta_icon" src="img/time.svg">${metadata.duration || '?'} <span>duration</span></div>
                <div class="blog_metaline"> <img class="meta_icon" src="img/cal.svg">${metadata.burn || '?'} <span>kcal burned</span></div>
                <div class="blog_metaline"> <img class="meta_icon" src="img/mayor.svg">${metadata.mayors || '0'} <span>mayor(s) met</span></div>
                <div class="blog_metaline"> <img class="meta_icon" src="img/wheel.svg">${metadata.flats || '0'} <span>flat tire(s)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${videoEmbed}
      <div class="section">
        <div class="blog_text_section">
          ${content}
        </div>
      </div>
      <div class="section_spacer"></div>
      </section>
    `;
  }
  // Deep-link helpers
  setupDeepLinks() {
    // Scroll to hash or ?day=
    this.scrollToDeepLink();

    // Update hash as user scrolls sections
    this.observeAndUpdateHash();
  }

  scrollToDeepLink() {
    console.log('Checking for deep link...');
    const url = new URL(window.location.href);
    let targetId = url.hash || '';
    if (!targetId) {
      const qDay = url.searchParams.get('day');
      if (qDay) targetId = `#day${qDay}`;
    }
    if (targetId) {
      console.log('Scrolling to', targetId);
      const el = document.querySelector(targetId);
      if (el) {
        const OFFSET = 100; // pixels
        const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }

  observeAndUpdateHash() {
    const sections = document.querySelectorAll('section[id^="day"]');
    if (!sections.length) return;

    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      if (`#${id}` !== window.location.hash) {
        history.replaceState(null, '', `#${id}`);
      }
    }, { root: null, threshold: [0.5] });

    sections.forEach(s => io.observe(s));
  }
  /**
   * Get the appropriate weather icon based on the weather condition
   */
  getWeatherIcon(weatherCondition) {
    const weatherIcons = {
      // Clear conditions
      'sunny': 'sun.svg',


      // Partly cloudy conditions
      'partly cloudy': 'part.svg',


      // Cloudy conditions
      'cloudy': 'cloud.svg',


      // Rain conditions
      'rainy': 'rain.svg',


      // Thunderstorm conditions
      'stormy': 'storm.svg',


      // Snow conditions
      'thunder': 'thunder.svg',

      // Snow conditions
      'snowy': 'snow.svg',


      // Fog/mist conditions
      'foggy': 'fog.svg',


    };

    // Convert to lowercase and trim for consistent matching
    const normalizedCondition = weatherCondition.toLowerCase().trim();

    // Return the appropriate icon or default to cloud.svg if not found
    return weatherIcons[normalizedCondition] || 'cloud.svg';
  }
}

// Initialize the update parser when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the updates page
  if (document.getElementById('blog')) {
    const parser = new UpdateParser();
    parser.init();
  }
});