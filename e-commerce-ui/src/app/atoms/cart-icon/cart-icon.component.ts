import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgClass} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-cart-icon',
    standalone: true,
    imports: [NgClass],
    template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="relative"
      [@cartBounce]="animationState"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />

      <!-- Item count badge -->
      @if (itemCount > 0) {
        <g [@badgePulse]="'active'">
          <circle
            cx="18"
            cy="6"
            r="6"
            [ngClass]="badgeClass"
            fill="currentColor"
          />
          <text
            x="18"
            y="6"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="14"
            font-weight="lighter"
            fill="white"
          >{{ displayCount }}</text>
        </g>
      }
    </svg>
  `,
    styles: ``,
    animations: [
        trigger('cartBounce', [
            state('idle', style({
                transform: 'scale(1)'
            })),
            state('bounce', style({
                transform: 'scale(1)'
            })),
            transition('idle => bounce', [
                animate('300ms ease-in-out', style({transform: 'scale(1.2)'})),
                animate('200ms ease-in-out', style({transform: 'scale(1)'}))
            ])
        ]),
        trigger('badgePulse', [
            state('active', style({
                opacity: 1
            })),
            transition(':enter', [
                style({opacity: 0, transform: 'scale(0.5)'}),
                animate('300ms ease-out', style({opacity: 1, transform: 'scale(1.2)'})),
                animate('200ms ease-in-out', style({opacity: 1, transform: 'scale(1)'}))
            ])
        ])
    ]
})
export class CartIconComponent implements OnChanges {
    @Input() itemCount = 0;
    @Input() badgeClass = 'text-primary';
    animationState = 'idle';
    private previousCount = 0;

    get displayCount(): string {
        return this.itemCount > 99 ? '99+' : this.itemCount.toString();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['itemCount'] && !changes['itemCount'].firstChange) {
            if (this.itemCount > this.previousCount) {
                // Trigger animation when items are added
                this.animationState = 'bounce';
                setTimeout(() => {
                    this.animationState = 'idle';
                }, 500);
            }
            this.previousCount = this.itemCount;
        }
    }
}
