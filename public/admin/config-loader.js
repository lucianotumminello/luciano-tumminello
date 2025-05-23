
(function() {
  console.log('[Config Loader] Starting config validation');
  
  // Function to validate YAML syntax (simplified check)
  function validateYaml(content) {
    try {
      // Basic validation by checking for common YAML syntax issues
      const lines = content.split('\n');
      let indentLevel = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Skip empty lines and comments
        if (!line.trim() || line.trim().startsWith('#')) continue;
        
        // Check if line has balanced quotes
        const quoteCount = (line.match(/"/g) || []).length;
        if (quoteCount % 2 !== 0) {
          throw new Error(`Unbalanced quotes at line ${i + 1}: ${line}`);
        }
        
        // Check for colons without space after them (outside of quotes)
        if (/[^"]:(?!\s|$)/.test(line)) {
          throw new Error(`Missing space after colon at line ${i + 1}: ${line}`);
        }
      }
      
      console.log('[Config Loader] YAML validation passed');
      return true;
    } catch (error) {
      console.error('[Config Loader] YAML validation failed:', error);
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
        console.log('[Config Loader] Config fetched successfully');
        
        // Validate YAML syntax
        if (validateYaml(content)) {
          console.log('[Config Loader] Config is valid');
          
          // Add the config as a link tag with proper MIME type
          const existingLink = document.querySelector('link[rel="cms-config-url"]');
          if (existingLink) {
            console.log('[Config Loader] Config link already exists');
          } else {
            const link = document.createElement('link');
            link.rel = 'cms-config-url';
            link.type = 'text/yaml';
            link.href = `/admin/config.yml?validated=true&t=${Date.now()}`;
            document.head.appendChild(link);
            console.log('[Config Loader] Added config link to document head');
          }
        } else {
          console.error('[Config Loader] Config validation failed');
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
          <button style="background-color: #3182ce; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; font-size: 0.875rem; cursor: pointer; margin-top: 1rem;" onclick="window.location.reload()">Try Again</button>
        </div>
      `;
    }
  }
  
  // Start the validation process
  document.addEventListener('DOMContentLoaded', loadAndValidateConfig);
  
  // If DOM is already loaded, run immediately
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(loadAndValidateConfig, 100);
  }
})();
