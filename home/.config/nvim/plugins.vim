" auto-install vim-plug
if empty(glob('~/.config/nvim/autoload/plug.vim'))
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  "autocmd VimEnter * PlugInstall
  autocmd VimEnter * PlugInstall | source $MYVIMRC
endif
" Specify a directory for plugins
"
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.config/nvim/plugged')



"-------------------------------------------------------------------------
" plugins
"-------------------------------------------------------------------------



" fuzzy finder
" todo: add fzf installation script
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
set rtp+=/home/linuxbrew/.linuxbrew/opt/fzf
nnoremap <leader>F :FZF<CR>

Plug 'tpope/vim-repeat'                                   " for repeating plugin commands too (like surround)

" git stuff
Plug 'tpope/vim-fugitive'                                 " usefull git commands from inside of vim
Plug 'airblade/vim-gitgutter'                             " gin changed lines indicator
Plug 'tpope/vim-sleuth'                                   " auto set indent settings

Plug 'neoclide/coc.nvim', {'branch': 'release'}           " vscode-like LSP client
source $HOME/.config/nvim/coc-config.vim                  " with it's own config

Plug 'preservim/nerdtree'                                 " project file tree viewer <C-e> for toggle
Plug '907th/vim-auto-save'                                " save files on every change instead of typing ':w' every time
let g:auto_save = 1                                       " enable by default
let g:auto_save_silent = 1                                " do not display the auto-save notification

Plug 'tpope/vim-commentary'                               " use 'gcc' to comment line in file based on its type
Plug 'tpope/vim-surround'                                 " helpful surround commands, e.g. ysw' to add ([y]ield) ' around [w]ord, cs'( to [c]hange [s]urround from ['] to '(') and ds' to [d]elete [s]urround
Plug 'https://gitlab.com/code-stats/code-stats-vim.git'   " codestats.net plugin
let g:codestats_api_key = 'SFMyNTY.Y21GdFlYcGhiaTU1WVhCd1lYSnZkZz09IyNNVEUxTmpZPQ.gC6i5vEv1OnSeCNYKIQJjoDM-rlbPz0yq4QiPbss-h8'

Plug 'vim-airline/vim-airline'                            " Vim airline for better status line
Plug 'vim-airline/vim-airline-themes'                     " Additional themes. Todo: find the BEST one
let g:airline_theme='raven'

Plug 'Yggdroot/indentLine'                                " Add intentation line indicator
let g:indentLine_char_list = ['|', '¦', '┆', '┊']

Plug 'stephpy/vim-yaml'                                   " Faster yaml sytax highlightning

Plug 'mileszs/ack.vim'
nnoremap <leader>a :Ack!<Space>

Plug 'hashivim/vim-terraform'

call plug#end()

" Automatically install missing plugins on startup
autocmd VimEnter *
  \  if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
  \|   PlugInstall --sync | q
  \| endif
