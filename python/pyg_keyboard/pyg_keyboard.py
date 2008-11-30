#------------------------------------------------------------------------------
#           Name: pyg_keyboard.py
#         Author: Kevin Harris
#  Last Modified: 10/07/04
#    Description: This Python/Pygame script demonstrates how to move an image 
#                 using keyboard input.
# http://www.codesampler.com/python.htm
#
# Tags: python keyboard game interaction movement
#------------------------------------------------------------------------------

import pygame
from pygame.locals import *

def main():
    pygame.init()	

    screen = pygame.display.set_mode( (640,480) )
    
    background = pygame.Surface( screen.get_size() )

    background.fill( (255,255,255) )

    sprite = pygame.image.load( "galaga_ship.bmp" )

    spriteRect = sprite.get_rect()

    spriteRect.centerx = (640 / 2)
    spriteRect.centery = (480 / 2)

    screen.blit( background, (0,0) )
    screen.blit( sprite, spriteRect )

    pygame.display.flip()

    while 1:
        pygame.event.pump()
        keyinput = pygame.key.get_pressed()
        
        if keyinput[K_ESCAPE] or pygame.event.peek(QUIT):
            break

        if keyinput[K_LEFT]:
            spriteRect.centerx -= 2
        
        if keyinput[K_RIGHT]:
            spriteRect.centerx += 2

        if keyinput[K_UP]:
            spriteRect.centery -= 2		

        if keyinput[K_DOWN]:
            spriteRect.centery += 2		

        screen.blit( background, (0,0) )
        screen.blit( sprite, spriteRect )

        pygame.display.flip()

if __name__ == '__main__': main()
