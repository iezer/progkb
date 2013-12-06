(add-hook 'before-save-hook 'delete-trailing-whitespace)

(setq indent-tabs-mode nil) ; always replace tabs with spaces

(global-set-key (kbd "M-TAB") 'dabbrev-expand)
(global-set-key (kbd "M-T") 'auto-revert-tail-mode)

;;mode-compile
    (autoload 'mode-compile "mode-compile"
      "Command to compile current buffer file based on the major mode" t)
    (global-set-key "\C-cc" 'mode-compile)
    (autoload 'mode-compile-kill "mode-compile"
      "Command to kill a compilation launched by `mode-compile'" t)
    (global-set-key "\C-ck" 'mode-compile-kill)

(add-to-list 'load-path "~/Code/elisp")

;;(require 'rvm)
;;(rvm-use-default) ;; use rvm's default ruby for the current Emacs session

;;(add-to-list 'load-path "~/.emacs.d/find-file-in-project")
(autoload 'find-file-in-project "find-file-in-project" "Find file in project." t)
(global-set-key (kbd "M-n") 'find-file-in-project)

(add-to-list 'load-path "rspec-mode")
(require 'rspec-mode)
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(rspec-use-rake-when-possible nil)
 '(web-mode-disable-auto-indentation nil))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.erb\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.handlebars\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.html?\\'" . web-mode))
(setq web-mode-code-indent-offset 2)
(setq web-mode-markup-indent-offset 2)

(require 'scss-mode)
(add-to-list 'auto-mode-alist '("\\.scss\\'" . scss-mode))
(add-to-list 'auto-mode-alist '("\\.sass\\'" . scss-mode))

(autoload 'css-mode "css-mode" "Mode for editing CSS files" t)
(add-to-list 'auto-mode-alist '("\\.css\\'" . css-mode))

;; CoffeeScript uses two spaces.
(make-local-variable 'tab-width)
(set 'tab-width 2)
(setq coffee-tab-width 2)

;; http://stackoverflow.com/questions/11623189/how-to-bind-keys-to-indent-unindent-region-in-emacs
(defun my-unindent-region (N)
  (interactive "p")
  (if mark-active
      (progn (indent-rigidly (min (mark) (point)) (max (mark) (point)) (* N -2))
             (setq deactivate-mark nil))
    (self-insert-command N)))

(global-set-key (kbd "<backtab>") 'my-unindent-region)


(column-number-mode)

(add-to-list 'load-path "ag.el")
(require 'ag)
(global-set-key (kbd "M-s") 'ag-project)

(add-to-list 'auto-mode-alist '("\\.rake\\'" . ruby-mode))

(setq ruby-deep-indent-paren nil)

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
;;(setq linum-format "%4d ")

(require 'git)
(require 'git-blame)

(require 'twittering-mode)

(define-derived-mode rails-log-mode ruby-mode "Rails log"
  "Major mode for viewing Rails log files.")
(add-to-list 'auto-mode-alist '("\\.log\\'" . rails-log-mode))
(add-hook 'rails-log-mode-hook 'auto-revert-tail-mode)
(add-hook 'rails-log-mode-hook 'end-of-buffer)

;; line numbers for specific modes
(global-linum-mode)
(setq linum-disabled-modes-list '(eshell-mode term-mode rails-log-mode log-view-mode wl-summary-mode compilation-mode)) (defun linum-on () (unless (or (minibufferp) (member major-mode linum-disabled-modes-list)) (linum-mode 1)))
