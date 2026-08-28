import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Livro } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';

@Component({ selector: 'app-livro-detalhe-page', imports: [RouterLink], templateUrl: './livro-detalhe-page.component.html', styleUrl: './livro-detalhe-page.component.scss' })
export class LivroDetalhePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute); private readonly service = inject(LivrosService);
  livro = signal<Livro | null>(null); erro = signal('');
  ngOnInit(): void { const id = Number(this.route.snapshot.paramMap.get('id')); this.service.buscarPorId(id).subscribe({ next: (livro) => this.livro.set(livro), error: () => this.erro.set('Livro não encontrado ou API indisponível.') }); }
}
