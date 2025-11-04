import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { customIcons } from "../../shared/constants/icons.constants";

@Injectable(
    {providedIn:"root"}

)
export class IconsService{
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ){}
      
    
    public registerIcons():void{
        this.loadIcons(Object.values(customIcons),"/assets/icons")
    }
    private loadIcons(iconKeys: string[], iconUrl: string): void {
        iconKeys.forEach(iconName => {
            this.matIconRegistry.addSvgIcon(iconName,this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${iconName}.svg`))
});
    }
}