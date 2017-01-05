'use babel';

import InsprView from './inspr-view';
import { CompositeDisposable } from 'atom';

export default {

  insprView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.insprView = new InsprView(state.insprViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.insprView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'inspr:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.insprView.destroy();
  },

  serialize() {
    return {
      insprViewState: this.insprView.serialize()
    };
  },

  toggle() {
    console.log('Inspr was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

  lower_camel_case() {}
  upper_camel_case() {}
  lower_underscores() {}
  upper_underscores() {}
};
