;; line numbers
(column-number-mode)
(global-display-line-numbers-mode t)
(setq display-line-numbers-type 'relative)
(add-hook 'term-mode-hook (lambda () (display-line-numbers-mode 0)))

;; Make ESC quit prompts
(global-set-key (kbd "<escape>") 'keyboard-escape-quit)


;; packaging config
(require 'package)
(setq package-archives '(("melpa" . "https://melpa.org/packages/")))
                         ;; ("org" . "https://orgmode.org/elpa/")
                         ;; ("elpa" . "https://elpa.gnu.org/packages/")))

(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))
(unless (package-installed-p 'use-package)
  (package-install 'use-package))

(require 'use-package)
(setq use-package-always-ensure t)

;; visual config
(setq inhibit-startup-message t)
(setq visible-bell t)

(scroll-bar-mode -1)
(tool-bar-mode -1)
(tooltip-mode -1)
(menu-bar-mode -1)
(set-fringe-mode 10)

(set-face-attribute 'default nil :font "Jetbrains Mono" :height 100)


;; theming
(use-package doom-modeline
  :ensure t
  :init (doom-modeline-mode 1))

(use-package doom-themes
  :ensure t
  :config
  ;; Global settings (defaults)
  (setq doom-themes-enable-bold t    ; if nil, bold is universally disabled
        doom-themes-enable-italic t) ; if nil, italics is universally disabled
  (load-theme 'doom-one t)

  ;; Enable flashing mode-line on errors
  (doom-themes-visual-bell-config)
  ;; Enable custom neotree theme (all-the-icons must be installed!)
  (doom-themes-neotree-config)
  ;; or for treemacs users
  (setq doom-themes-treemacs-theme "doom-atom") ; use "doom-colors" for less minimal icon theme
  (doom-themes-treemacs-config)
  ;; Corrects (and improves) org-mode's native fontification.
  (doom-themes-org-config))


;; swiper
;; (use-package ivy
;;   :diminish
;;   :bind (("C-s" . swiper)
;;          :map ivy-minibuffer-map
;;          ("TAB" . ivy-alt-done)
;;          ("C-l" . ivy-alt-done)
;;          ("C-j" . ivy-next-line)
;;          ("C-k" . ivy-previous-line)
;;          :map ivy-switch-buffer-map
;;          ("C-k" . ivy-previous-line)
;;          ("C-l" . ivy-done)
;;          ("C-d" . ivy-switch-buffer-kill)
;;          :map ivy-reverse-i-search-map
;;          ("C-k" . ivy-previous-line)
;;          ("C-d" . ivy-reverse-i-search-kill))
;;   :config
;;   (ivy-mode 1))
(use-package counsel
  :bind (("M-x" . counsel-M-x)
         ("C-x b" . counsel-ibuffer)
         ("C-x C-f" . counsel-find-file)
         :map minibuffer-local-map
         ("C-r" . 'counsel-minibuffer-history)))

(use-package ivy-rich
  :init (ivy-rich-mode 1))


;; helpful
(use-package helpful
  :custom
  (counsel-describe-function-function #'helpful-callable)
  (counsel-describe-variable-function #'helpful-variable)
  :bind
  ([remap describe-function] . counsel-describe-function)
  ([remap describe-command] . helpful-command)
  ([remap describe-variable] . counsel-describe-variable)
  ([remap describe-key] . helpful-key))


;; rainbow delimiters
(use-package rainbow-delimiters
  :hook (prog-mode . rainbow-delimiters-mode))

;; which-key
(use-package which-key
  :init (which-key-mode)
  :diminish which-key-mode
  :config (setq which-key-idle-delay 0))

;; evil mode
(use-package evil
  :init 
  (setq evil-want-integration t)
  (setq evil-want-keybinding nil)
  (setq evil-want-C-u-scroll t)
  (setq evil-want-C-i-jump nil)
  ; :hook (evil-mode . rune/evil-hook)
  :config
  (evil-mode 1)
  (define-key evil-normal-state-map (kbd "L") 'evil-end-of-line)
  (define-key evil-visual-state-map (kbd "L") 'evil-end-of-line)
  (define-key evil-normal-state-map (kbd "H") 'evil-beginning-of-line)
  (define-key evil-visual-state-map (kbd "H") 'evil-beginning-of-line)
  (define-key evil-normal-state-map (kbd "U") 'evil-redo)
  (define-key evil-normal-state-map (kbd ";") 'evil-ex)
  ;;(define-key evil-normal-state-map (kbd "<return>") (('evil-open-below) ('evil-ex)))

  (evil-set-initial-state 'messages-buffer-mode 'normal)
  (evil-set-initial-state 'dashboard-mode 'normal))

(use-package key-chord
  :config
  (setq key-chord-two-keys-delay 0.5)
  (key-chord-define evil-insert-state-map "jj" 'evil-normal-state)
  (key-chord-mode 1))

(use-package evil-collection
  :after evil
  :ensure t
  :config
  (evil-collection-init))

(use-package evil-numbers)

(use-package evil-surround
  :ensure t
  :config
  (global-evil-surround-mode 1))


;; projectile
(use-package projectile
  :ensure t
  :init
  (projectile-mode +1)
  :custom ((projectile-completion-system 'ivy)))
(setq projectile-project-search-path '("~/src/provectus/lanehealth/java"))

(use-package counsel-projectile
  :config (counsel-projectile-mode))

(use-package neotree)

;; magit
(use-package magit)

;; all other keymapping
(use-package general
  :after evil-numbers
  :config
  (general-create-definer my/leader-keys
    :keymaps '(normal visual emacs)
    :prefix "SPC"
    :global-prefix "SPC")

  (my/leader-keys
    "c"  '(:ignore t :which-key "code")
    "cc" '(comment-line :which-key "comment")
    "n"  '(:ignore t :which-key "number")
    "ni" '(evil-numbers/inc-at-pt :which-key "increment")
    "nu" '(evil-numbers/inc-at-pt :which-key "up")
    "nd" '(evil-numbers/inc-at-pt :which-key "decrement")
    "p"  '(projectile-command-map :which-key "projectile")
    "g"  '(:ignore t :which-key "magit")
    "gs" '(magit-status :which-key "status")
    "gb" '(magit-branch :which-key "branch")
    "gr" '(magit-reset :which-key "reset")
    "f"  '(:ignore t :which-key "file")
    "ft" '(neotree-toggle :which-key "tree")
    )
  )

;; lsp
(use-package lsp-mode
  :init
  ;; set prefix for lsp-command-keymap (few alternatives - "C-l", "C-c l")
  (setq lsp-keymap-prefix "C-l")
  :hook (;; replace XXX-mode with concrete major-mode(e. g. python-mode)
         ;; (prog-mode . lsp)
         ;; if you want which-key integration
         (lsp-mode . lsp-enable-which-key-integration))
  :config (setq lsp-completion-enable-additional-text-edit nil)
  :commands lsp)

;; optionally
(use-package flycheck)
(use-package yasnippet :config (yas-global-mode))
(use-package company)
(use-package hydra)
(use-package lsp-ui :commands lsp-ui-mode)
;; (use-package helm-lsp :commands helm-lsp-workspace-symbol)
(use-package lsp-ivy :commands lsp-ivy-workspace-symbol)
(use-package lsp-treemacs :commands lsp-treemacs-errors-list)
(use-package lsp-java :config (add-hook 'java-mode-hook 'lsp))
;; (use-package dap-mode :after lsp-mode :config (dap-auto-configure-mode))
;; (use-package dap-java :ensure nil)
(use-package helm
  :config (helm-mode))
(use-package helm-lsp)
(setq lsp-java-vmargs '("-noverify" "-Xmx1G" "-XX:+UseG1GC" "-XX:+UseStringDeduplication" "-javaagent:/home/ramazan/.m2/repository/org/projectlombok/lombok/1.18.22/lombok-1.18.22.jar" "-Xbootclasspath/a:/home/ramazan/.m2/repository/org/projectlombok/lombok/1.18.22/lombok-1.18.22.jar"))

;; this is auto generated

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(custom-safe-themes
   '("835868dcd17131ba8b9619d14c67c127aa18b90a82438c8613586331129dda63" "234dbb732ef054b109a9e5ee5b499632c63cc24f7c2383a849815dacc1727cb6" default))
 '(helm-minibuffer-history-key "M-p")
 '(package-selected-packages '(use-package)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
