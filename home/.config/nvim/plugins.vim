set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
Plugin 'tpope/vim-fugitive'
" Deoplete for better autocomplete
Plugin 'Shougo/deoplete.nvim'
let g:deoplete#enable_at_startup = 1
" NerdTree for project tree
Plugin 'preservim/nerdtree'
" Auto save
Plugin '907th/vim-auto-save'
let g:auto_save = 1
let g:auto_save_silent = 1  " do not display the auto-save notification

Plugin 'tpope/vim-commentary'
Plugin 'tpope/vim-surround'

" Vim airline for better status line
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'

" add intentation line
Plugin 'Yggdroot/indentLine'
let g:indentLine_char_list = ['|', '¦', '┆', '┊']

Plugin 'stephpy/vim-yaml'
" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
