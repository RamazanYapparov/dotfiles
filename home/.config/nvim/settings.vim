" This must be first, because it changes other options as side effect
set nocompatible
let mapleader=","

"--------------------------------------------------------------------------------
" options
"--------------------------------------------------------------------------------
set showtabline=2                 " always show tab line, even with only one open tab
set noswapfile                    " turn off swapfiles - don't want .swp files littering the joint!
" set hidden                        " allow unsaved changes
set shiftwidth=2                  " set tabs to width 2
set tabstop=2                     " set tabs to width 2
set expandtab                     " insert spaces, not tabs, when autoindenting
set smarttab                      " smart tab
set shiftround                    " use multiple of shiftwidth when indenting with '<' or '>'
set autoindent                    " use indent from previous line
set copyindent                    " copy the previous indentation
set ignorecase                    " ignore case when searching
set smartcase                     " ignore case if search pattern is all lowercase, case-sensitive otherwise
set incsearch                     " show search matches as you type
set hlsearch                      " highlight incsearch matches
set guioptions-=T                 " turn off the never-used toolbar buttons
" set clipboard=unnamed             " use the OS X clipboard for copy/paste (if no register is specified).  Thus, yy in vim will write to the system clipboard & can be pasted with Cmd-C
" set wildmode=list:longest         " make tab-completion behave like bash shell
set autochdir                     " always set vim's pwd to current file dir
set synmaxcol=250                 " only syntax highlight the first 250 columns; makes a big speed difference for wide files
set cursorline                    " enable cursorline coloring
set nowrap                        " don't wrap lines
" set ruler                         " should be replaced with airline
set backspace=indent,eol,start    " allow backspacing over everything in insert mode
set number relativenumber         " always show line numbers
set showmatch                     " set show matching parenthesis
set updatetime=100                " faster update time for gitgutter
set history=1000                  " remember more commands and search history
set undolevels=1000               " use many muchos levels of undo
set wildignore=*.pyc,*.class
set title                         " change the terminal's title
set visualbell                    " don't beep
set noerrorbells                  " don't beep
" set spell                         " spellcheck
set noshowmode                    " don't show status line, use vim-airline instead

set list                 " todo
set listchars=tab:>.,trail:.,extends:#,nbsp:. " show trailing spaces and tabs explicitly

colorscheme apprentice
" idea like theme
" colorscheme dracula
