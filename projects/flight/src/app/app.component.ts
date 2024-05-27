import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiCoreModule } from './shared/ui-core/ui-core.module';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [UiCoreModule, RouterOutlet]
})
export class AppComponent {
}
