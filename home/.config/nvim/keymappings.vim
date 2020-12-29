nnoremap L $
vnoremap L $
nnoremap H ^
vnoremap H ^
nnoremap ; :
inoremap jkl <Esc>
inoremap jj <Esc>
nnoremap U <C-r>
nnoremap <leader>r :source $HOME/.config/nvim/init.vim<CR>


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

" Copy and paste to system clipboard with leader prefix (,y;,p)
vnoremap  <leader>y  "+y
nnoremap  <leader>Y  "+yg_
nnoremap  <leader>y  "+y
nnoremap  <leader>yy  "+yy
nnoremap <leader>p "+p
nnoremap <leader>P "+P
vnoremap <leader>p "+p
vnoremap <leader>P "+P
vnoremap <C-c> "+y
inoremap <C-v> <Esc>"+pa

nnoremap x "_x
nnoremap d "_d
nnoremap D "_D
vnoremap d "_d

nnoremap <leader>d ""d
nnoremap <leader>D ""D
vnoremap <leader>d ""d


" command to save a file opened in non-sudo mode
cmap w!! w !sudo tee % >/dev/null

nnoremap <C-e> :NERDTreeToggle<CR>
" command to enter normal mode in embedded terminal
tnoremap <Esc> <C-\><C-n>

" add closing } on typing for java files only
au Filetype java inoremap { {<CR>}<Esc>kA<CR>
