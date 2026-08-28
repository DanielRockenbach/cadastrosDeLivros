import { Component, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LivroInput } from '../../models/livro';

@Component({ selector: 'app-formulario-livro', imports: [FormsModule], templateUrl: './formulario-livro.component.html', styleUrl: './formulario-livro.component.scss' })
export class FormularioLivroComponent {
  salvar = output<LivroInput>();
  cancelar = output<void>();
  erro = signal('');
  livro: LivroInput = { titulo: '', autor: '', categoria: 'Tecnologia', ano: new Date().getFullYear(), status: 'disponivel', descricao: '' };

  enviar(form: NgForm): void {
    if (form.invalid) { this.erro.set('Preencha todos os campos obrigatórios.'); return; }
    this.erro.set(''); this.salvar.emit({ ...this.livro });
  }
}
