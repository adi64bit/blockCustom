(function(blocks, editor, i18n, element, components, _, immBlock) {
  var el = element.createElement;
  var RichText = editor.RichText;
  var MediaUpload = editor.MediaUpload;
  var BlocksData = immBlock['imm-test'];

  blocks.registerBlockType('imm/'+BlocksData.slug, {
    title: i18n.__(BlocksData.title, 'imm'),
    icon: BlocksData.icon,
    category: BlocksData.category,
    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: 'h5',
      },
      mediaID: {
        type: 'number',
      },
      mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
      },
    },
    edit: function(props) {
      var attributes = props.attributes;

      var onSelectImage = function(media) {
        return props.setAttributes({
          mediaURL: media.url,
          mediaID: media.id,
        });
      };

      return (
        el('div', {
            className: props.className
          },
          el('div', { className: 'the-content'},
            el(RichText, {
              tagName: 'h5',
              inline: true,
              placeholder: i18n.__('Write The title…', 'gutenberg-examples'),
              value: attributes.title,
              onChange: function(value) {
                props.setAttributes({
                  title: value
                });
              },
            })
          )
        )
      );
    },
    save: function(props) {
      var attributes = props.attributes;

      return (
        el('div', {
            className: props.className
          },
          el('div',
            { className: 'the-content'},
            el(RichText.Content, {
              tagName: 'h5',
              value: attributes.title
            })
          )
        )
      );
    },
  });

})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.i18n,
  window.wp.element,
  window.wp.components,
  window._,
  window.immBlock
);
