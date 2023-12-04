import { Component } from '../../../components/baseComponents/snail/component';
import { createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

export class Sidebar extends Component<never, never> {

    public render() {

        return createElement(
            'sidebar',
            {
                class: 'profile-sidebar',
            },
            
        );
    }
}

// <div class="menu">
//     <div class="breadcrumb"></div>
//     <span class="text-subheader">{{#if this.name}}
//             {{this.name}}
//         {{else}}
//             {{this.email}}
//         {{/if}}</span>
//     <div
//         style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
//         {{#if this.avatar}}
//             <img style="width: 80px; height: 80px;" src="{{this.avatar}}" alt="" srcset="">
//         {{else}}
//             <div style="width: 80px; height: 80px; position: relative; background: rgba(41, 44, 47, 0.25)"></div>
//         {{/if}}
//     </div>
//     <div class="divider">
//     </div>
//     <div id="btn-products"></div>
//     <div id="btn-orders"></div>
//     <div id="btn-favorite"></div>
//     <div id="btn-settings"></div>
//     <div id="btn-support"></div>
// </div>
