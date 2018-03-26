/**
 * @file
 * Plugin to insert listicle heading elements.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

(function ($) {
  // Register the plugin within the editor.
  CKEDITOR.plugins.add('listicleh2', {
    lang: 'en',

    // Register the icons.
    icons: 'listicleh2',

    // The plugin initialization logic goes inside this method.
    init: function (editor) {
      var lang = editor.lang.listicleh2;

      // Define an editor command that opens our dialog.
      editor.addCommand('listicleh2', new CKEDITOR.dialogCommand('listicleh2Dialog', {

        // Allow h2 tag with optional title.
        allowedContent: 'h2[data-number]',

        // Require h2 tag to be allowed to work.
        requiredContent: 'h2',

        contentForms: [
                'h2'
        ]
      }));

      // Create a toolbar button that executes the above command.
      editor.ui.addButton('listicleh2', {

        // The text part of the button (if available) and tooptip.
        label: lang.buttonTitle,

        // The command to execute on click.
        command: 'listicleh2',

        // The button placement in the toolbar (toolbar group name).
        toolbar: 'insert',

        // The path to the icon.
        icon: this.path + 'icons/listicleh2.png'
      });

      if (editor.contextMenu) {
        editor.addMenuGroup('listicleh2Group');
        editor.addMenuItem('listicleh2Item', {
          label: lang.menuItemTitle,
          icon: this.path + 'icons/listicleh2.png',
          command: 'listicleh2',
          group: 'listicleh2Group'
        });

        editor.contextMenu.addListener(function (element) {
          if (element.getAscendant('h2', true)) {
            return { h2: CKEDITOR.TRISTATE_OFF };
          }
        });
      }

      // Register our dialog file. this.path is the plugin folder path.
      CKEDITOR.dialog.add('listicleh2Dialog', this.path + 'dialogs/listicleh2.js');
    }
  });
})(jQuery);
