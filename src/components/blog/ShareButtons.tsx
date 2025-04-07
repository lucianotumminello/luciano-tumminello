
import React, { useState } from "react";
import { Share2, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { useIsMobile } from "@/hooks/use-mobile";

interface ShareButtonsProps {
  pageUrl: string;
  title: string;
  translationPrefix: string;
}

const ShareButtons = ({ pageUrl, title, translationPrefix }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();
  const isItalian = translationPrefix === "it";

  const handleShare = (platform: string) => {
    switch (platform) {
      case 'email':
        const subject = encodeURIComponent(title);
        const body = encodeURIComponent(`${title}\n\n${pageUrl}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title}: ${pageUrl}`)}`);
        break;
      case 'whatsapp-business':
        // Updated to use WhatsApp Business app
        window.open(`https://api.whatsapp.com/send?phone=&text=${encodeURIComponent(`${title}: ${pageUrl}`)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        toast.success(isItalian ? "URL copiato negli appunti!" : "URL copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          {isItalian ? "Condividi" : "Share"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {isMobile ? (
          <>
            <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="flex items-center gap-2 cursor-pointer">
              <WhatsAppIcon />
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('whatsapp-business')} className="flex items-center gap-2 cursor-pointer">
              <WhatsAppIcon />
              WhatsApp Business
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('linkedin')} className="flex items-center gap-2 cursor-pointer">
              <LinkedInIcon />
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('email')} className="flex items-center gap-2 cursor-pointer">
              <Mail className="h-4 w-4" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('copy')} className="flex items-center gap-2 cursor-pointer">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? (isItalian ? "Copiato!" : "Copied!") : (isItalian ? "Copia URL" : "Copy URL")}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => handleShare('email')} className="flex items-center gap-2 cursor-pointer">
              <Mail className="h-4 w-4" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('linkedin')} className="flex items-center gap-2 cursor-pointer">
              <LinkedInIcon />
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('copy')} className="flex items-center gap-2 cursor-pointer">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? (isItalian ? "Copiato!" : "Copied!") : (isItalian ? "Copia URL" : "Copy URL")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButtons;
