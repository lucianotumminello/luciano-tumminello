
(function() {
  console.log('[Config Loader] Starting config validation');
  
  // Improved function to validate YAML syntax with more reliable checks
  function validateYaml(content) {
    try {
      console.log('[Config Loader] Starting basic YAML validation');
      
      // Basic structure validation
      if (!content || content.trim().length < 10) {
        console.error('[Config Loader] Empty or too small config file');
        return false;
      }
      
      // Check for required top-level keys
      const requiredKeys = ['backend', 'media_folder', 'collections'];
      let foundKeys = 0;
      
      requiredKeys.forEach(key => {
        if (content.includes(key + ':')) foundKeys++;
      });
      
      if (foundKeys < requiredKeys.length) {
        console.error('[Config Loader] Missing required keys in config');
        return false;
      }
      
      // Check for common YAML syntax issues
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines and comments
        if (!line || line.startsWith('#')) continue;
        
        // Check for array items formatting
        if (line.startsWith('-') && line.length > 1 && line[1] !== ' ' && line[1] !== '{') {
          console.error(`[Config Loader] Invalid array item format at line ${i+1}: ${line}`);
          return false;
        }
        
        // Check for proper key-value separator
        if (line.includes(':') && !line.includes(': ') && !line.endsWith(':') && !line.includes('://')) {
          const colonPos = line.indexOf(':');
          const nextChar = line[colonPos + 1];
          if (nextChar !== ' ' && nextChar !== '\n' && nextChar !== '\r') {
            console.error(`[Config Loader] Missing space after colon at line ${i+1}: ${line}`);
            return false;
          }
        }
        
        // Check for unclosed quotes
        let quoteChar = null;
        let inQuote = false;
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if ((char === '"' || char === "'") && (j === 0 || line[j - 1] !== '\\')) {
            if (!inQuote) {
              inQuote = true;
              quoteChar = char;
            } else if (char === quoteChar) {
              inQuote = false;
              quoteChar = null;
            }
          }
        }
        
        if (inQuote) {
          console.error(`[Config Loader] Unclosed quote at line ${i+1}: ${line}`);
          return false;
        }
      }
      
      console.log('[Config Loader] Basic YAML validation passed');
      return true;
    } catch (error) {
      console.error('[Config Loader] YAML validation error:', error);
      return false;
    }
  }
  
  // Function to fetch and validate the config
  function loadAndValidateConfig() {
    console.log('[Config Loader] Fetching config.yml');
    
    // Force cache busting
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
        
        // Check if we should bypass validation
        if (window.bypassConfigValidation) {
          console.log('[Config Loader] Bypassing validation as requested');
          setupConfigLink(true);
          return;
        }
        
        // Validate YAML syntax
        if (validateYaml(content)) {
          console.log('[Config Loader] Config is valid, setting up CMS');
          setupConfigLink(true);
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
  
  // Set up the config link for the CMS
  function setupConfigLink(isValid) {
    // Add the config as a link tag with proper MIME type
    const existingLink = document.querySelector('link[rel="cms-config-url"]');
    if (existingLink) {
      console.log('[Config Loader] Updating existing config link');
      existingLink.href = `/admin/config.yml?validated=${isValid}&t=${Date.now()}`;
    } else {
      const link = document.createElement('link');
      link.rel = 'cms-config-url';
      link.type = 'text/yaml';
      link.href = `/admin/config.yml?validated=${isValid}&t=${Date.now()}`;
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
      console.log('[Config Loader] CMS object not yet available, checking if script needs to be loaded');
      // Check if we need to load the CMS script
      if (!document.querySelector('script[src*="decap-cms"]')) {
        loadCmsScript();
      }
    }
  }
  
  // Load the CMS script if needed
  function loadCmsScript() {
    console.log('[Config Loader] Loading CMS script');
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
    script.onload = () => {
      console.log('[Config Loader] CMS script loaded successfully');
      setTimeout(() => {
        if (window.CMS) {
          window.CMS.init();
          console.log('[Config Loader] CMS initialization triggered after script load');
        }
      }, 500);
    };
    script.onerror = () => {
      console.error('[Config Loader] Failed to load CMS script, trying backup');
      loadBackupCmsScript();
    };
    document.body.appendChild(script);
  }
  
  // Load backup CMS script if primary fails
  function loadBackupCmsScript() {
    console.log('[Config Loader] Loading backup CMS script');
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/decap-cms@^3.0.0/dist/decap-cms.js';
    script.onload = () => {
      console.log('[Config Loader] Backup CMS script loaded successfully');
      setTimeout(() => {
        if (window.CMS) {
          window.CMS.init();
          console.log('[Config Loader] CMS initialization triggered after backup script load');
        }
      }, 500);
    };
    script.onerror = () => {
      console.error('[Config Loader] Even backup CMS script failed to load');
      showConfigError('Failed to load CMS from multiple sources. Try Force Init below.');
    };
    document.body.appendChild(script);
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
      setupConfigLink(true);
      
      // Load scripts if needed
      if (!window.CMS && !document.querySelector('script[src*="decap-cms"]')) {
        loadCmsScript();
      } else if (window.CMS) {
        // If CMS is already loaded, try to initialize it directly
        window.CMS.init();
        console.log('[Config Loader] Force init: CMS.init() called');
      }
      
      // Show a message to the user
      const rootEl = document.getElementById('nc-root');
      if (rootEl) {
        rootEl.innerHTML = `
          <div style="padding: 1rem; border: 1px solid #c6f6d5; border-radius: 0.25rem; background-color: #f0fff4; margin: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
            <h3>Forcing CMS Initialization</h3>
            <p>Bypassing validation and attempting to load CMS directly...</p>
            <div class="loader" style="border: 4px solid #f3f3f3; border-top: 4px solid #38a169; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 1rem auto;"></div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
            <p>If CMS doesn't load within 10 seconds, try refreshing the page.</p>
          </div>
        `;
      }
    } catch (e) {
      console.error('[Config Loader] Force init failed:', e);
      showConfigError('Force initialization failed: ' + e.message);
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
