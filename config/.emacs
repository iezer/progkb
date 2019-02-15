;; Reverse colors for the border to have nicer line
(set-face-inverse-video-p 'vertical-border nil)
(set-face-background 'vertical-border (face-background 'default))

(set-face-attribute 'mode-line nil
   :foreground "gray60" :background "gray20"
   :inverse-video nil
   :box '(:line-width 6 :color "gray20" :style nil))

(add-hook 'before-save-hook 'delete-trailing-whitespace)
(prefer-coding-system 'utf-8-unix)
(setq indent-tabs-mode nil) ; always replace tabs with spaces

(global-set-key (kbd "M-i") 'dabbrev-expand)
(global-set-key (kbd "M-SPC") 'set-mark-command)
(global-set-key (kbd "M-T") 'auto-revert-tail-mode)
;; (global-set-key (kbd "M-%") 'query-replace-regexp)
;; (define-key global-map "\C-s" 'isearch-forward-regexp)
;;mode-compile
    ;; (autoload 'mode-compile "mode-compile"
    ;;   "Command to compile current buffer file based on the major mode" t)
    ;; (global-set-key "\C-cc" 'mode-compile)
    ;; (autoload 'mode-compile-kill "mode-compile"
    ;;   "Command to kill a compilation launched by `mode-compile'" t)
    ;; (global-set-key "\C-ck" 'mode-compile-kill)

(add-to-list 'load-path "~/elisp")
(add-to-list 'load-path "cl-lib")
(add-to-list 'load-path "grizzl")
(add-to-list 'load-path "fiplr")

;;(require 'rvm)
;;(rvm-use-default) ;; use rvm's default ruby for the current Emacs session

(global-set-key (kbd "M-n") 'fiplr-find-file)

(setq fiplr-ignored-globs '((directories ("tmp" "bower_components" "node_modules" "build" "vendor" "public" "dist" "coverage" ".git" ".svn" "website"))
			    (files ("*.jpg" "*.png" "*.log" "*.zip" "*~" "#*#" ".gitkeep"))))

(setq fiplr-root-markers '(".git" ".svn" ".emacs.fiplr"))

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(dired-trivial-filenames "^\\.\\.?$\\|^#|*~$")
 '(enh-ruby-deep-indent-paren nil)
 '(js-expr-indent-offset -2)
 '(package-selected-packages
   (quote
    (add-node-modules-path prettier-js ember-mode xclip enh-ruby-mode rspec-mode js2-mode string-inflection wgrep-ag multiple-cursors flycheck fiplr evil cl-generic alchemist)))
 '(rspec-use-spring-when-possible nil)
 '(ruby-deep-arglist nil)
 '(ruby-deep-indent-paren nil))

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.erb\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.handlebars\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.hbs\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.html?\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.css?\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.sass?\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.scss?\\'" . web-mode))
(setq web-mode-code-indent-offset 2)
(setq web-mode-markup-indent-offset 2)
(setq web-mode-css-indent-offset 2)
(setq web-mode-attr-indent-offset 2)
(setq web-mode-enable-auto-closing t)
(setq-default indent-tabs-mode nil)
(setq js2-basic-offset 2)
(setq js2-strict-inconsistent-return-warning nil)

(setq dired-mode-hook
  '(lambda () (progn
    (set-variable 'dired-hide-details-mode t))))


(setq js2-mode-hook
  '(lambda () (progn
    (set-variable 'indent-tabs-mode nil))))

;; (add-to-list 'load-path "scss-mode")
;; (require 'scss-mode)
;; (add-to-list 'auto-mode-alist '("\\.scss\\'" . scss-mode))
;; (add-to-list 'auto-mode-alist '("\\.sass\\'" . scss-mode))
;; (setq css-indent-offset 2)

;; (autoload 'css-mode "css-mode" "Mode for editing CSS files" t)
;; (add-to-list 'auto-mode-alist '("\\.css\\'" . css-mode))

;; CoffeeScript uses two spaces.
(make-local-variable 'tab-width)
(set 'tab-width 2)
(setq coffee-tab-width 2)

(setq js-indent-level 2)

;; http://stackoverflow.com/questions/11623189/how-to-bind-keys-to-indent-unindent-region-in-emacs
(defun my-unindent-region (N)
  (interactive "p")
  (if mark-active
      (progn (indent-rigidly (min (mark) (point)) (max (mark) (point)) (* N -2))
             (setq deactivate-mark nil))
    (self-insert-command N)))

(global-set-key (kbd "<backtab>") 'my-unindent-region)

(column-number-mode)

(require 'ag)
(setq ag-reuse-buffers t)
(setq ag-highlight-search t)
(global-set-key (kbd "M-s") 'ag-project)
(defalias 'agk 'ag-kill-buffers)

(autoload 'wgrep-ag-setup "wgrep-ag")
(add-hook 'ag-mode-hook 'wgrep-ag-setup)
(setq wgrep-auto-save-buffer t)
(setq wgrep-enable-key "r")

(set 'grep-find-ignored-directories '("tmp" "bower_components" "node_modules" "build" "vendor" "public" "dist" "coverage" ".git" ".svn" "website"))
(set 'ag-ignore-list '("tmp" "build" "vendor" "public" "dist" ".git" ".svn" "*.log" "node_modules" "website"))

(add-to-list 'auto-mode-alist '("\\.rb\\'" . rspec-mode))
(add-to-list 'auto-mode-alist '("\\.rb\\'" . enh-ruby-mode))
(add-to-list 'auto-mode-alist '("\\.rake\\'" . enh-ruby-mode))
(add-to-list 'auto-mode-alist '("\\Gemfile\\'" . enh-ruby-mode))

;; http://royontechnology.blogspot.com/2012/04/minor-annoyance-of-running-rails.html
(defun rails-console ()
  "Create a rails console process, if one doesn't exist. And switch to *rails-console* buffer."
  (interactive)
  (if (null (get-buffer "*rails-console*"))
      (progn
        (linum-mode 0)
        (term "/bin/bash")
        (term-send-string (get-buffer-process "*terminal*") "rc\n")
        (switch-to-buffer "*terminal*")
        (rename-buffer "*rails-console*")
        (term-line-mode))
    (switch-to-buffer "*rails-console*")))

;;Add a space after line numbers
 ; space before and after makes git-gutter behave
(setq linum-format "%4d ")

;;(require 'twittering-mode)

(defun ansi-colorize-current-buffer ()
  "Colorize ansi escape sequences in the current buffer."
  (interactive)
  (ansi-color-apply-on-region (point-min) (point-max)))

(define-derived-mode rails-log-mode enh-ruby-mode "Rails log"
  "Major mode for viewing Rails log files.")
(add-to-list 'auto-mode-alist '("\\.log\\'" . rails-log-mode))
(add-hook 'rails-log-mode-hook 'auto-revert-tail-mode)
(add-hook 'rails-log-mode-hook 'ansi-colorize-current-buffer)
(add-hook 'rails-log-mode-hook 'end-of-buffer)

;; line numbers for specific modes
(global-linum-mode)
(setq linum-disabled-modes-list '(eshell-mode term-mode rails-log-mode log-view-mode wl-summary-mode compilation-mode)) (defun linum-on () (unless (or (minibufferp) (member major-mode linum-disabled-modes-list)) (linum-mode 1)))

(menu-bar-mode -1)

;;(require 'dash-at-point)
;;(add-hook 'after-open-hook (lambda () (setq dash-at-point-docset "to.be")))


(add-hook 'coffee-mode-hook
          (lambda () (local-set-key (kbd "C-c,v") 'coffee-compile-buffer)))

(show-paren-mode 1)
(setq show-paren-delay 0)

;;(require 'git)
;;(require 'git-blame)
(require 'git-commit-mode)
(require 'git-rebase-mode)
(require 'git-gutter)
(global-git-gutter-mode t)

(require 'package)
(add-to-list 'package-archives
             '("melpa" . "https://melpa.org/packages/"))
 (add-to-list 'package-archives
 	                  '("melpa-stable" . "http://stable.melpa.org/packages/") t)
(package-initialize)

;;(add-to-list 'load-path "~/Code/magit/bin/")
;;(eval-after-load 'info
;;  '(progn (info-initialize)
;;          (add-to-list 'Info-directory-list "/path/to/magit/")))
;;(require 'magit)


;; Interactively Do Things (highly recommended, but not strictly required)
;;(require 'ido)
;;
;;(ido-mode -1)

;; Rinari
;;(add-to-list 'load-path "~/Code/rinari")
;;(require 'rinari)

;; for clojure
;;(require 'package)

;;(add-to-list 'package-archives
;;             '("marmalade" . "http://marmalade-repo.org/packages/"))
;;(package-initialize)
;; (defvar my-packages '(starter-kit
;;                       starter-kit-lisp
;;                       starter-kit-bindings
;;                       starter-kit-eshell
;;                       clojure-mode
;;                       clojure-test-mode
;;                       cider))

;; (dolist (p my-packages)
;;   (when (not (package-installed-p p))
;;     (package-install p)))

;;(require 'yaml-mode)
;;(add-to-list 'auto-mode-alist '("\\.yml$" . yaml-mode))

(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))
(add-to-list 'auto-mode-alist '("\\.ts$" . js2-mode))
(autoload 'espresso-mode "espresso")

;; (add-to-list 'load-path "~/.emacs.d/ember-mode/")
;; (require 'ember-mode)

(add-to-list 'load-path
	     "yasnippet.el")
(require 'yasnippet)
(yas-global-mode 1)

(electric-pair-mode t)
;;(setq electric-pair-inhibit-if-helps-balance nil)
(push '(?\' . ?\') electric-pair-pairs)
(push '(?\` . ?\`) electric-pair-pairs)
(global-set-key (kbd "M-t") 'transpose-lines)

(put 'narrow-to-region 'disabled nil)
(put 'narrow-to-page 'disabled nil)
"heloo"
;; Hide dired details by default
(load "dired-x")
(add-hook 'dired-mode-hook
	  (lambda () (dired-hide-details-mode 1)))
(add-hook 'dired-mode-hook
	  (lambda () (dired-omit-mode 1)))

;; (add-to-list
;;  'comint-preoutput-filter-functions
;;  (lambda (output)
;;    (replace-regexp-in-string "\\[[0-9]+[GK]" "" output)))

(setenv "NODE_NO_READLINE" "1")

(setq backup-directory-alist `((".*" . ,temporary-file-directory)))
(setq auto-save-file-name-transforms `((".*" ,temporary-file-directory t)))
(setq create-lockfiles nil)

;; http://www.flycheck.org/manual/latest/index.html
(require 'flycheck)

;; turn on flychecking globally
(add-hook 'after-init-hook #'global-flycheck-mode)

;; disable jshint since we prefer eslint checking
(setq-default flycheck-disabled-checkers
              (append flycheck-disabled-checkers
                      '(javascript-jshint)
                      '(javascript-jscs)))

;; use web-mode for .jsx files
;;(add-to-list 'auto-mode-alist '("\\.jsx$" . web-mode))
;; use eslint with web-mode for jsx files
;;(flycheck-add-mode 'javascript-eslint 'web-mode)

;; customize flycheck temp file prefix
(setq-default flycheck-temp-prefix ".flycheck")

;; disable json-jsonlist checking for json files
(setq-default flycheck-disabled-checkers
              (append flycheck-disabled-checkers
                      '(json-jsonlist)))

;; https://github.com/purcell/exec-path-from-shell
;; only need exec-path-from-shell on OSX
;; this hopefully sets up path and other vars better
(when (memq window-system '(mac ns))
  (exec-path-from-shell-initialize))

(add-to-list 'auto-mode-alist '("\\.ex\\'" . elixir-mode))
;;(add-to-list 'auto-mode-alist '("\\.ex\\'" . alchemist-mode))

(require 'window-number)
(window-number-mode t)
(window-number-meta-mode t)

(provide '.emacs)

;;; .emacs ends here
;; (put 'downcase-region 'disabled nil)
;; (put 'upcase-region 'disabled nil)

(require 'string-inflection)
(global-set-key (kbd "C-c u") 'string-inflection-underscore)
(global-set-key (kbd "C-c c") 'string-inflection-camelcase)        ;; Force to CamelCase
(global-set-key (kbd "C-c l") 'string-inflection-lower-camelcase)  ;; Force to lowerCamelCase

(require 'multiple-cursors)
(global-set-key (kbd "C-c d") 'mc/mark-next-like-this)
(global-set-key (kbd "C-c p") 'mc/mark-previous-like-this)
(global-set-key (kbd "C-c a") 'mc/mark-all-like-this)

(xclip-mode 1)

(add-hook 'js-mode-hook (lambda () (ember-mode t)))
(add-hook 'web-mode-hook (lambda () (ember-mode t)))


(eval-after-load 'js2-mode
  '(progn
     (add-hook 'js2-mode-hook #'add-node-modules-path)
     (add-hook 'js2-mode-hook #'prettier-js-mode)))
