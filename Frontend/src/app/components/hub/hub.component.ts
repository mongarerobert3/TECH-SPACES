import { Component } from '@angular/core';
import { Hub } from 'src/app/classes/hub';
import { HubService } from 'src/app/services/hub.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent {
  hubs? : Hub[];

  constructor(private hubService: HubService) { }
  ngOnInit():void {
    this.hubService.getSpaces().subscribe((data: Hub[]) => {
      this.hubs = data;
    });
    this.ngOnInit();
  }
}
