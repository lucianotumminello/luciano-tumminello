
# Luciano Tumminello Website

## CMS Setup Instructions

This website uses Decap CMS (formerly Netlify CMS) to manage blog content. To set up the CMS:

1. Deploy the site to Netlify
2. Enable Netlify Identity
   - Go to Site Settings > Identity > Enable Identity
   - Set registration to Invite Only
   - Enable Git Gateway: Settings > Identity > Services > Git Gateway > Enable
3. Invite yourself as a user
   - Go to Identity tab in Netlify dashboard
   - Click Invite users
   - Enter your email address
4. Accept the invitation
   - Click the link in the invitation email
   - Set up your password
5. Access the CMS at `/admin/`

## Local Development

For local development with the CMS:

1. Install the Netlify CLI: `npm install netlify-cli -g`
2. Run `netlify dev` to start local development server with Netlify Identity
3. Access the local CMS at `http://localhost:8888/admin/`

## Content Structure

Blog posts are stored in `content/blog/` and are accessible through Decap CMS. 
Images are stored in `public/lovable-uploads/` directory.

## Features

- Multilingual blog posts (English/Italian)
- Responsive design for all devices
- Server-side content storage
- Cross-browser and cross-session accessibility
