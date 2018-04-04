/**
 * @file
 * Plugin to insert listicle heading elements.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

(function ($) {
  // Register the plugin within the editor.
  CKEDITOR.plugins.add('listicleh', {
    lang: 'en',

    // Register the icons.
    icons: 'listicleh',

    // The plugin initialization logic goes inside this method.
    init: function (editor) {
      var lang = editor.lang.listicleh;

      // Define an editor command that opens our dialog.
      editor.addCommand('listicleh', new CKEDITOR.dialogCommand('listiclehDialog'));

      // Create a toolbar button that executes the above command.
      editor.ui.addButton('listicleh', {

        // The text part of the button (if available) and tooptip.
        label: lang.buttonTitle,

        // The command to execute on click.
        command: 'listicleh',

        // The button placement in the toolbar (toolbar group name).
        toolbar: 'insert',

        // The path to the icon.
        icon: this.path + 'icons/listicleh.png'
      });

      if (editor.contextMenu) {
        editor.addMenuGroup('listiclehGroup');
        editor.addMenuItem('listiclehItem', {
          label: lang.menuItemTitle,
          icon: this.path + 'icons/listicleh.png',
          command: 'listicleh',
          group: 'listiclehGroup'
        });

        editor.contextMenu.addListener(function (element) {
          if (element.getAscendant('div', true)) {
            return { div: CKEDITOR.TRISTATE_OFF };
          }
        });
      }

      // Register our dialog file. this.path is the plugin folder path.
      CKEDITOR.dialog.add('listiclehDialog', this.path + 'dialogs/listicleh.js');
    }
  });
})(jQuery);
