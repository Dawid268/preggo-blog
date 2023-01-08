import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./features/main/main.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "", component: MainComponent },
  {
    path: "*",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
