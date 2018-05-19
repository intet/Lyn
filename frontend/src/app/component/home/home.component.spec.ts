import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {ApiCardComponent} from '../index';
import {MockApiService} from '../../security/service/mocks/api.service.mock';

import {MatButtonModule, MatCardModule} from '@angular/material';

import {ApiService, AuthService, ConfigService, FooService, UserService} from '../../security/service/index';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ApiCardComponent
      ],
      imports: [
        MatButtonModule,
        MatCardModule
      ],
      providers: [
        {
          provide: ApiService,
          useClass: MockApiService
        },
        AuthService,
        UserService,
        FooService,
        ConfigService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
