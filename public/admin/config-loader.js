
(function() {
  console.log('[Config Loader] Starting config validation');
  
  // Function to validate YAML syntax (comprehensive validation)
  function validateYaml(content) {
    try {
      console.log('[Config Loader] Starting detailed YAML validation');
      
      // Basic validation by checking for common YAML syntax issues
      const lines = content.split('\n');
      let inQuote = false;
      
      for (let i = 0; i < lines.length; i++) {
        const lineNumber = i + 1;
        const line = lines[i];
        
        // Skip empty lines and comments
        if (!line.trim() || line.trim().startsWith('#')) continue;
        
        // Check for balanced quotes on each line
        let quoteCount = 0;
        for (let j = 0; j < line.length; j++) {
          if (line[j] === '"' && (j === 0 || line[j-1] !== '\\')) {
            quoteCount++;
          }
        }
        
        if (quoteCount % 2 !== 0) {
          console.error(`[Config Loader] YAML validation error: Unbalanced quotes at line ${lineNumber}: ${line}`);
          return false;
        }
        
        // Check for colons followed immediately by text (no space)
        // But ignore URLs and values inside quotes
        const colonMatches = line.match(/:[^\s"]/g);
        if (colonMatches) {
          // Check if the colon is within a URL (e.g. http://) or within quotes
          let isInvalid = false;
          for (const match of colonMatches) {
            const colonPos = line.indexOf(match);
            const prefix = line.substring(0, colonPos);
            
            // Skip if it's likely part of a URL or within quotes
            if (!prefix.includes('http') && 
                !prefix.includes('https') && 
                !prefix.includes('ftp') &&
                quoteCount === 0) {
              isInvalid = true;
              break;
            }
          }
          
          if (isInvalid) {
            console.error(`[Config Loader] YAML validation error: Missing space after colon at line ${lineNumber}: ${line}`);
            return false;
          }
        }
        
        // Check for improper indentation
        const leadingSpaces = line.length - line.trimStart().length;
        if (leadingSpaces % 2 !== 0 && leadingSpaces > 0) {
          console.error(`[Config Loader] YAML validation error: Improper indentation at line ${lineNumber}: ${line}`);
          return false;
        }
      }
      
      // Look for common YAML issues
      if (content.includes('{{') && !content.includes('}}')) {
        console.error('[Config Loader] YAML validation error: Unmatched {{ }} template literals');
        return false;
      }
      
      // Check for proper array formatting
      const arrayItemRegex = /- \S/g;
      const arrayMatches = content.match(arrayItemRegex);
      if (arrayMatches) {
        for (const match of arrayMatches) {
          if (!match.startsWith('- {')) {
            // This is fine, just checking for array format
          }
        }
      }
      
      console.log('[Config Loader] YAML validation passed successfully');
      return true;
    } catch (error) {
      console.error('[Config Loader] YAML validation error:', error);
      return false;
    }
  }
  
  // Function to fetch and validate the config
  function loadAndValidateConfig() {
    console.log('[Config Loader] Fetching config.yml');
    
    fetch('/admin/config.yml?nocache=' + Date.now())
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.status}`);
        }
        return response.text();
      })
      .then(content => {
        console.log('[Config Loader] Config fetched successfully, length:', content.length);
        
        if (content.length < 10) {
          console.error('[Config Loader] Config file appears empty or too small');
          showConfigError('Config file appears empty. Please verify the file.');
          return;
        }
        
        // Validate YAML syntax
        if (validateYaml(content)) {
          console.log('[Config Loader] Config is valid, setting up CMS');
          
          // Add the config as a link tag with proper MIME type
          const existingLink = document.querySelector('link[rel="cms-config-url"]');
          if (existingLink) {
            console.log('[Config Loader] Updating existing config link');
            existingLink.href = `/admin/config.yml?validated=true&t=${Date.now()}`;
          } else {
            const link = document.createElement('link');
            link.rel = 'cms-config-url';
            link.type = 'text/yaml';
            link.href = `/admin/config.yml?validated=true&t=${Date.now()}`;
            document.head.appendChild(link);
            console.log('[Config Loader] Added config link to document head');
          }
          
          // If CMS is already loaded, try to reinitialize
          if (window.CMS) {
            console.log('[Config Loader] Attempting to reinitialize CMS with valid config');
            try {
              window.CMS.init();
              console.log('[Config Loader] CMS reinitialization triggered');
            } catch (e) {
              console.log('[Config Loader] CMS reinitialization not needed or failed:', e.message);
            }
          } else {
            console.log('[Config Loader] CMS object not yet available, waiting for script load');
          }
        } else {
          console.error('[Config Loader] Config validation failed - YAML syntax issues detected');
          showConfigError('YAML validation failed. Check console for details.');
        }
      })
      .catch(error => {
        console.error('[Config Loader] Error loading config:', error);
        showConfigError(`Error loading config: ${error.message}`);
      });
  }
  
  // Function to show config error
  function showConfigError(message) {
    const rootEl = document.getElementById('nc-root');
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="color: #e53e3e; padding: 1rem; border: 1px solid #fed7d7; border-radius: 0.25rem; background-color: #fff5f5; margin: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
          <h3>Configuration Error</h3>
          <p>There was a problem with the CMS configuration.</p>
          <p>Error details: ${message}</p>
          <div>
            <button style="background-color: #3182ce; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; font-size: 0.875rem; cursor: pointer; margin-top: 1rem; margin-right: 0.5rem;" 
                    onclick="window.cmsValidation.validate()">Try Again</button>
            <button style="background-color: #718096; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; font-size: 0.875rem; cursor: pointer; margin-top: 1rem;" 
                    onclick="window.location.href='/'">Return to Site</button>
            <button style="background-color: #38a169; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; font-size: 0.875rem; cursor: pointer; margin-top: 1rem; margin-left: 0.5rem;" 
                    onclick="window.cmsValidation.forceInitCMS()">Force CMS Init</button>
          </div>
        </div>
      `;
    }
  }
  
  // Function to force CMS initialization
  function forceInitCMS() {
    console.log('[Config Loader] Forcing CMS initialization');
    try {
      // Set a flag to bypass config validation
      window.bypassConfigValidation = true;
      
      // Create or update the config link
      const existingLink = document.querySelector('link[rel="cms-config-url"]');
      if (existingLink) {
        existingLink.href = `/admin/config.yml?force=true&t=${Date.now()}`;
      } else {
        const link = document.createElement('link');
        link.rel = 'cms-config-url';
        link.type = 'text/yaml';
        link.href = `/admin/config.yml?force=true&t=${Date.now()}`;
        document.head.appendChild(link);
      }
      
      // Attempt to init CMS or load script if not present
      if (window.CMS) {
        console.log('[Config Loader] CMS object found, trying to initialize');
        window.CMS.init();
      } else {
        console.log('[Config Loader] CMS object not found, loading script');
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
        script.onload = () => {
          console.log('[Config Loader] CMS script loaded, initializing');
          setTimeout(() => {
            if (window.CMS) {
              window.CMS.init();
            }
          }, 500);
        };
        document.body.appendChild(script);
      }
    } catch (e) {
      console.error('[Config Loader] Force init failed:', e);
      alert('Failed to initialize CMS: ' + e.message);
    }
  }
  
  // Start the validation process
  document.addEventListener('DOMContentLoaded', loadAndValidateConfig);
  
  // If DOM is already loaded, run immediately
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(loadAndValidateConfig, 100);
  }
  
  // Expose functions for debugging and manual retry
  window.cmsValidation = {
    validate: loadAndValidateConfig,
    showError: showConfigError,
    forceInitCMS: forceInitCMS
  };
})();
