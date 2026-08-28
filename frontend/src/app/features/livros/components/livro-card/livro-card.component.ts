import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-livro-card',
  imports: [RouterLink],
  templateUrl: './livro-card.component.html',
  styleUrl: './livro-card.component.scss',
})
export class LivroCardComponent {
  livro = input.required<Livro>();
  alternarStatus = output<Livro>();
  excluir = output<number>();
}
