<?php
/*
BLOCK Name: IMM - Test
Description: Test Block
Author: IMM
Author URI: https://islandmediamanagement.com
*/

if( class_exists('Imm_Block_Widget') &&  !class_exists('IMM_Test')){
  class IMM_Test extends Imm_Block_Widget{
    function __construct(){

      parent::__construct(
        'imm-test',
        'IMM - Test',
        'index-card',
        'widgets',
        'this is test block',
        IMM_BLOCK_DIR_URI.str_replace(IMM_BLOCK_DIR, '', __DIR__).'/js/main.js',
        IMM_BLOCK_DIR_URI.str_replace(IMM_BLOCK_DIR, '', __DIR__).'/css/style.css'
      );
    }
  }
  $immBlock = new IMM_Test();
}
