import { Routes } from '@angular/router';
import { LivrosPageComponent } from './features/livros/pages/livros-page/livros-page.component';
import { LivroDetalhePageComponent } from './features/livros/pages/livro-detalhe-page/livro-detalhe-page.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'livros' },
	{ path: 'livros', component: LivrosPageComponent },
	{ path: 'livros/:id', component: LivroDetalhePageComponent },
	{ path: '**', redirectTo: 'livros' },
];
