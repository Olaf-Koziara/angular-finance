import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: "authenticated-template",
  templateUrl: "./authenticated-template.html",
  imports: [RouterOutlet, SidebarComponent]
})
export class AuthenticatedTemplateComponent{

}