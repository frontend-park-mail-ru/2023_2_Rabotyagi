import { stringToElement } from '../../shared/utils/parsing';
import template from './content.hbs';
import { store } from '../../shared/store/store';
import button from '../../components/button/button';
import svg from '../../components/svg/svg';
import favIcon from '../../assets/icons/fav.svg';

class Content {
    render(context) {
        const root = stringToElement(template(context));

        if (store.user.isAuth() && (context.saler.id != store.user.state.fields.id)) {
            root.querySelector('.content>.header').appendChild(button({
                variant: 'neutral',
                subVariant: 'tertiary',
                text: {
                    class: 'text-regular',
                    content: 'Добавить в избранное'
                },
                leftIcon: svg({ content: favIcon, width: 20, height: 20 })
            }));
        }

        root.querySelector('.content>.header>button')?.addEventListener('click', function() {
            console.log('added to fav');
            this.classList.toggle('active');
        });

        return root;
    }
}

export default Content;