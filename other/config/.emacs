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

(autoload 'scss-mode "scss-mode")
(add-to-list 'auto-mode-alist '("\\.scss\\'" . scss-mode))
(add-to-list 'auto-mode-alist '("\\.sass\\'" . scss-mode))
(add-to-list 'auto-mode-alist '("\\.css.scss\\'" . scss-mode))

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

(global-linum-mode)

(add-to-list 'load-path "ag.el")
(require 'ag)
(global-set-key (kbd "M-s") 'ag-project)

(add-to-list 'auto-mode-alist '("\\.rake\\'" . ruby-mode))
