import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro, LivroInput } from '../models/livro';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LivrosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/livros';

  listar(): Observable<Livro[]> { return this.http.get<Livro[]>(this.apiUrl); }
  buscarPorId(id: number): Observable<Livro> { return this.http.get<Livro>(`${this.apiUrl}/${id}`); }
  criar(livro: LivroInput): Observable<Livro> { return this.http.post<Livro>(this.apiUrl, livro); }
  atualizar(id: number, livro: Partial<LivroInput>): Observable<Livro> { return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro); }
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
