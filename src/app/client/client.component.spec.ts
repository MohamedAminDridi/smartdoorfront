import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPageComponent } from './client.component';

describe('ClientComponent', () => {
  let component: ClientPageComponent;
  let fixture: ComponentFixture<ClientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
