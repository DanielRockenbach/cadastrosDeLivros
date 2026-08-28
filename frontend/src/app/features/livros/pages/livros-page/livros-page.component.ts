import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro, LivroInput } from '../../models/livro';
import { LivrosService } from '../../services/livros.service';
import { LivroCardComponent } from '../../components/livro-card/livro-card.component';
import { FormularioLivroComponent } from '../../components/formulario-livro/formulario-livro.component';

@Component({ selector: 'app-livros-page', imports: [FormsModule, LivroCardComponent, FormularioLivroComponent], templateUrl: './livros-page.component.html', styleUrl: './livros-page.component.scss' })
export class LivrosPageComponent implements OnInit {
  private readonly service = inject(LivrosService);
  livros = signal<Livro[]>([]); busca = ''; filtroStatus = 'todos'; carregando = signal(true); erro = signal(''); mostrandoFormulario = signal(false);
  ngOnInit(): void { this.carregar(); }
  carregar(): void { this.carregando.set(true); this.service.listar().subscribe({ next: (livros) => { this.livros.set(livros); this.carregando.set(false); }, error: () => { this.erro.set('Não foi possível conectar à API. Confira se o backend está em execução.'); this.carregando.set(false); } }); }
  get filtrados(): Livro[] { const termo = this.busca.toLowerCase().trim(); return this.livros().filter((livro) => (!termo || `${livro.titulo} ${livro.autor} ${livro.categoria}`.toLowerCase().includes(termo)) && (this.filtroStatus === 'todos' || livro.status === this.filtroStatus)); }
  salvar(livro: LivroInput): void { this.service.criar(livro).subscribe({ next: (novo) => { this.livros.update((lista) => [novo, ...lista]); this.mostrandoFormulario.set(false); }, error: () => this.erro.set('Não foi possível cadastrar o livro.') }); }
  alternarStatus(livro: Livro): void { const status = livro.status === 'disponivel' ? 'emprestado' : 'disponivel'; this.service.atualizar(livro.id, { status }).subscribe({ next: (atualizado) => this.livros.update((lista) => lista.map((item) => item.id === atualizado.id ? atualizado : item)), error: () => this.erro.set('Não foi possível alterar o status.') }); }
  excluir(id: number): void { if (!confirm('Excluir este livro?')) return; this.service.excluir(id).subscribe({ next: () => this.livros.update((lista) => lista.filter((item) => item.id !== id)), error: () => this.erro.set('Não foi possível excluir o livro.') }); }
}
