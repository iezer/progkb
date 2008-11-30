import HTMLParser
import urllib
import sys

#Define the HTML parser
class parseAttrs(HTMLParser.HTMLParser):
    def init_parser (self):
        self.pieces = []

    def handle_starttag(self, tag, attrs):
        fixedAttrs = ""
        #for name,value in attrs:
        for name, value in attrs:
            fixedAttrs += "%s=\"%s\" " % (name, value)
        self.pieces.append("<%s %s>" % (tag, fixedAttrs))

    def handle_charref(self, name):
        self.pieces.append("&#%s;" % (name))

    def handle_endtag(self, tag):
        self.pieces.append("</%s>" % (tag))

    def handle_entityref(self, ref):
        self.pieces.append("&%s" % (ref))

    def handle_data(self, text):
        self.pieces.append(text)

    def handle_comment(self, text):
        self.pieces.append("<!--%s-->" % (text))

    def handle_pi(self, text):
        self.pieces.append("<?%s>" % (text))

    def handle_decl(self, text):
        self.pieces.append("<!%s>" % (text))

    def parsed (self):
        return "".join(self.pieces)

#Create instance of HTML parser
attrParser = parseAttrs()

#Initialize the parser data
attrParser.init_parser()

#Feed HTML file into parser
attrParser.feed(urllib.urlopen("test2.html").read())

#Display original file contents
print "Original File\n========================"
print open("test2.html").read()

#Display the parsed file
print "Parsed File\n========================"
print attrParser.parsed()

attrParser.close()
