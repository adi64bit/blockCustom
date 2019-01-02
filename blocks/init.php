<?php
define( 'IMM_BLOCK_DIR', get_template_directory() . '/inc/blocks/' );
define( 'IMM_BLOCK_DIR_URI', get_template_directory_uri() . '/inc/blocks/' );

/**
 *
 */
class Imm_Block_Widget{
	public $id;
	public $title;
	public $icon;
	public $category;
	public $description;
	public $jsUrl;
	public $cssUrl;

	public function __construct($id, $title, $icon, $category, $description, $jsUrl, $cssUrl){
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		$this->id = $id;
		$this->title = $title;
		$this->icon = $icon;
		$this->category = $category;
		$this->description = $description;
		$this->jsUrl = $jsUrl;
		$this->cssUrl = $cssUrl;
		add_filter('roots_localize_script', array($this, 'localize_foobar'));
		add_action( 'enqueue_block_editor_assets', function(){
			$this->get_block_editor();
		} );
		add_action( 'enqueue_block_assets', function(){
			$this->get_block_style_front();
		} );
	}
	function localize_foobar($opt) {
		$opt[$this->id] = array(
			'slug' => $this->id,
			'title' => $this->title,
			'icon' => $this->icon,
			'category' => $this->category,
			'description' => $this->description,
			'cssUrl' => $this->cssUrl,
			'jsUrl' => $this->jsUrl
		);
		return $opt;
	}
	function get_block_style_front(){
		wp_enqueue_style(
			$this->id.'-css',
			$this->cssUrl,
			array()
		);
	}
	function get_block_editor(){
		wp_enqueue_script(
			$this->id.'-js',
			$this->jsUrl,
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' )
		);
		wp_localize_script( $this->id.'-js', 'immBlock', apply_filters('roots_localize_script', array()));
		wp_enqueue_style(
			$this->id.'-css',
			$this->cssUrl,
			array( )
		);
	}
}

/**
 * Include all the widget files and register their widgets
 */
function imm_register_all_block(){

	foreach(glob(IMM_BLOCK_DIR.'*/*.php') as $file) {
		include_once ($file);
	}

}
add_action('init', 'imm_register_all_block');
