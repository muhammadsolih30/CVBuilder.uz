import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title="Change Language">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => changeLanguage('uz')}
          className={`cursor-pointer py-2.5 px-3 text-sm rounded-md transition-colors ${i18n.language === 'uz' ? 'bg-emerald-500 text-white font-medium hover:bg-emerald-600 focus:bg-emerald-600 focus:text-white' : ''}`}
        >
          O'zbekcha
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('ru')}
          className={`cursor-pointer py-2.5 px-3 text-sm rounded-md transition-colors ${i18n.language === 'ru' ? 'bg-emerald-500 text-white font-medium hover:bg-emerald-600 focus:bg-emerald-600 focus:text-white' : ''}`}
        >
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer py-2.5 px-3 text-sm rounded-md transition-colors ${i18n.language === 'en' || i18n.language === 'en-US' ? 'bg-emerald-500 text-white font-medium hover:bg-emerald-600 focus:bg-emerald-600 focus:text-white' : ''}`}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
