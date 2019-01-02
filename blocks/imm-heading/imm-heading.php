<?php
/*
BLOCK Name: IMM - Heading
Description: IMM Heading
Author: IMM
Author URI: https://islandmediamanagement.com
*/

if( class_exists('Imm_Block_Widget') &&  !class_exists('IMM_Heading')){
  class IMM_Heading extends Imm_Block_Widget{
    function __construct(){

      parent::__construct(
        'imm-heading',
        'IMM - Heading',
        'index-card',
        'widgets',
        'IMM Heading',
        IMM_BLOCK_DIR_URI.str_replace(IMM_BLOCK_DIR, '', __DIR__).'/js/main.js',
        IMM_BLOCK_DIR_URI.str_replace(IMM_BLOCK_DIR, '', __DIR__).'/css/style.css'
      );
    }
  }
  $immBlock = new IMM_Heading();
}
