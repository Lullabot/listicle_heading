/**
 * @file
 * The abbr dialog definition.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Our dialog definition.
CKEDITOR.dialog.add('listicleh2Dialog', function (editor) {
  var lang = editor.lang.listicleh2;

  return {

    // Basic properties of the dialog window: title, minimum size.
    title: lang.dialogTitle,
    minWidth: 400,
    minHeight: 200,

    // Dialog window contents definition.
    contents: [
    {
      // Definition of the Basic Settings dialog tab (page).
      id: 'tab-basic',
      label: 'Basic Settings',

      // The tab contents.
      elements: [
      {
        // Text input field for the abbreviation text.
        type: 'text',
        id: 'listicleh2',
        label: lang.dialogListicleHeadingNumber,

        // Validation checking whether the field is not empty.
        validate: CKEDITOR.dialog.validate.notEmpty("Listicle heading number field cannot be empty"),

        // Called by the main setupContent call on dialog initialization.
        setup: function (element) {
          this.setValue(element.getAttribute("data-number"));
        },

        // Called by the main commitContent call on dialog confirmation.
        commit: function (element) {
          var number = this.getValue();
          if (number !== '') {
            element.setAttribute("data-number", number);
            element.setAttribute("class", "listicle");
          }
          else {
            element.removeAttribute("data-number");
          }
        }
      },
      {
        // Text input field for the listicle heading title.
        type: 'text',
        id: 'title',
        label: lang.dialogListicleHeadingTitle,

        // Require title attribute to be enabled.
        requiredContent: 'h2[class]',

        // Called by the main setupContent call on dialog initialization.
        setup: function (element) {
          this.setValue(element.getText());
        },

        // Called by the main commitContent call on dialog confirmation.
        commit: function (element) {
          element.setText(this.getValue());
        },

        onShow: function() {
          var selection = editor.getSelection();
          if (!selection || selection.getStartElement().getAscendant('h2', true)) {
            return;
          }

          this.setValue(editor.getSelection().getSelectedText());
        }
      }
      ]
    }
    ],

    // Invoked when the dialog is loaded.
    onShow: function () {

      // Get the selection in the editor.
      var selection = editor.getSelection();

      // Get the element at the start of the selection.
      var element = selection.getStartElement();

      // Get the <h2> element closest to the selection, if any.
      if (element) {
        element = element.getAscendant('h2', true);
      }

      // Create a new <h2> element if it does not exist.
      if (!element || element.getName() != 'h2') {
        element = editor.document.createElement('h2');

        // Flag the insertion mode for later use.
        this.insertMode = true;
      }
      else {
        this.insertMode = false;
      }

      // Store the reference to the <h2> element in an internal property, for later use.
      this.element = element;

      // Invoke the setup methods of all dialog elements, so they can load the element attributes.
      if (!this.insertMode) {
        this.setupContent(this.element);
      }
    },

    // This method is invoked once a user clicks the OK button, confirming the dialog.
    onOk: function () {

      // The context of this function is the dialog object itself.
      // http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
      var dialog = this;

      // Creates a new <h2> element.
      var h2 = this.element;

      // Invoke the commit methods of all dialog elements, so the <h2> element gets modified.
      this.commitContent(h2);

      // Finally, in if insert mode, inserts the element at the editor caret position.
      if (this.insertMode) {
        editor.insertElement(h2);
      }
    }
  };
});
