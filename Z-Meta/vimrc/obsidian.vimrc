" Have j and k navigate visual lines rather than logical ones
nmap j gj
nmap k gk
" I like using H and L for beginning/end of line
nmap H ^
nmap L $
" Quickly remove search highlights
nmap <F9> :nohl

" Yank to system clipboard
set clipboard=unnamed

" Go back and forward with Ctrl+O and Ctrl+I
" (make sure to remove default Obsidian shortcuts for these to work)
exmap back obcommand app:go-back
nmap <C-o> :back
exmap forward obcommand app:go-forward
nmap <C-i> :forward

exmap accentA jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('á')}
exmap accentE jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('é')}
exmap accentI jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('í')}
exmap accentO jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('ó')}
exmap accentU jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('ú')}
exmap accentAUpper jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('Á')}
exmap accentEUpper jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('É')}
exmap accentIUpper jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('Í')}
exmap accentOUpper jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('Ó')}
exmap accentUUpper jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('Ú')}
exmap tildedNSpanish jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('ñ')}
exmap tildedNSpanishUpper jsfile Z-Meta/vimrc/mdHelpers.js {insertCharacter('Ñ')}

exmap jumpWeekHeader jsfile Z-Meta/vimrc/mdHelpers.js {jumpToDayHeading()}

imap [a :accentA
imap [e :accentE
imap [i :accentI
imap [o :accentO
imap [u :accentU
imap [A :accentAUpper
imap [E :accentEUpper
imap [I :accentIUpper
imap [O :accentOUpper
imap [U :accentUUpper
imap [; :tildedNSpanish
imap [: :tildedNSpanishUpper

nmap [w :jumpWeekHeader
