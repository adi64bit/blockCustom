(function(blocks, editor, i18n, element, components, _, immBlock) {

  var el = element.createElement,
    Fragment = wp.element.Fragment,
    BlocksData = immBlock['imm-heading'],
    __ = i18n.__;

  const {
    DropdownMenu,
    ToggleControl
  } = components;

  const {
    RichText,
    BlockControls,
    InspectorControls,
    AlignmentToolbar,
    MediaUpload
  } = editor;

  blocks.registerBlockType('imm/' + BlocksData.slug, {
    title: i18n.__(BlocksData.title, 'imm'),
    icon: BlocksData.icon,
    category: BlocksData.category,
    attributes: {
      alignment: {
        type: 'string',
      },
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
      applyStyles: {
        type: 'string',
        default: '',
      }
    },
    edit :  props => {
      const {
        title,
        mediaURL,
        mediaID,
        alignment,
        applyStyles,
      } = props.attributes;
      var onSelectImage = function(media) {
        return props.setAttributes({
          mediaURL: media.url,
          mediaID: media.id,
        });
      },
      tetet = function(obj) {
        return el(components.Button, {
          className: mediaID ? 'image-button' : 'button button-large',
          onClick: obj.open
        }, !mediaID ? i18n.__('Upload Image', 'gutenberg-examples') : el('img', {
          src: mediaURL
        }));
      };
      const control = [
        el(
          InspectorControls, {},
          el(
            DropdownMenu, {
              label: __('Select an alignment'),
              controls: [{
                  title: 'Left',
                  icon: 'arrow-up-alt',
                  onClick: function() {
                    console.log('left clicked');
                  }
                },
                {
                  title: 'Center',
                  icon: 'arrow-up-alt',
                  onClick: function() {
                    console.log('center clicked');
                  }
                },
                {
                  title: 'right',
                  icon: 'arrow-up-alt',
                  onClick: function() {
                    console.log('right clicked');
                  }
                }
              ]
            }
          )
        )
      ];
      return [control,
        el('div', {
            className: props.className
          },
          el('div', {
              className: 'the-image'
            },
            el(MediaUpload, {
              onSelect: onSelectImage,
              allowedTypes: 'image',
              value: mediaID,
              render: tetet
            })
          ),
          el('div', {
              className: 'the-content'
            },
            el(RichText, {
              tagName: 'h5',
              inline: true,
              placeholder: i18n.__('Write The title…', 'gutenberg-examples'),
              value: title,
              onChange: function(value) {
                props.setAttributes({
                  title: value
                });
              },
            })
          )
        )
      ];
    },

    save: function(props) {
      const {
        title,
        mediaURL,
        mediaID,
        alignment,
        applyStyles,
      } = props.attributes;

      return (
        el('div', {
            className: props.className
          },
          el('div', {
              className: 'the-image'
            },
            mediaURL &&
            el('img', {
              src: mediaURL
            })
          ),
          el('div', {
              className: 'the-content'
            },
            el(RichText.Content, {
              tagName: 'h5',
              value: title
            })
          )
        )
      );
    }
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
