import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-5">
      <i class="bi bi-inbox fs-1 text-muted"></i>
      <h5 class="mt-2">{{ message }}</h5>
      <p class="text-muted">{{ description }}</p>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() message = 'Nenhum item encontrado';
  @Input() description = 'Comece adicionando um novo item';
}
