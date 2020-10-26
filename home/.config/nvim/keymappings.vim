" change the mapleader from \ to ,
let mapleader=","
nnoremap L $
nnoremap H ^
nnoremap ; :
inoremap jk <Esc>
nnoremap U <C-r>


" Easy window navigation
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

" ,/ for to remove highlights after serach
nmap <silent> <leader>/ :nohlsearch<CR>
" enter in normal mode to create blank line
nmap <S-Enter> O<Esc>
nmap <CR> o<Esc>

imap <C-space> <C-n>

" Copy and paste to system clipboard with leader prefix (,y;,p)
vnoremap  <leader>y  "+y
nnoremap  <leader>Y  "+yg_
nnoremap  <leader>y  "+y
nnoremap  <leader>yy  "+yy
nnoremap <leader>p "+p
nnoremap <leader>P "+P
vnoremap <leader>p "+p
vnoremap <leader>P "+P

" command to save a file opened in non-sudo mode
cmap w!! w !sudo tee % >/dev/null

nnoremap <C-e> :NERDTreeToggle<CR>
