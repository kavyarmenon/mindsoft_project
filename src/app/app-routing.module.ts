import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
	{
		path: '',
		component: FullComponent,
		children: [
			{ path: '', redirectTo: '/general-setting/company-info-list', pathMatch: 'full' },
			{
				path: 'general-setting',
				loadChildren: () => import('./general-setting/general-setting.module').then(m => m.GeneralSettingModule)
			},
			// {
			// 	path: 'starter',
			// 	loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
			// },

		]
	},
	// {
	// 	path: '',
	// 	component: BlankComponent,
	// 	children: [
	// 		{
	// 			path: 'authentication',
	// 			loadChildren:
	// 				'./authentication/authentication.module#AuthenticationModule'
	// 		}
	// 	]
	// },
	
];
