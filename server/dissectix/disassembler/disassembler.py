#! /usr/bin/env python3

import fnmatch
import re
import sys
import io

from .binary import Binary

def print_text(disasm, stream=sys.stdout):
    for name, info in disasm.items():
        stream.write(info['asm'])
        stream.write('\n')

def print_yaml(disasm, stream=sys.stdout):
    from yaml import Dumper
    dumper = Dumper(stream)
    def strdump(dumper, data):
        return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='|')
    dumper.add_representer(str, strdump)

    dumper.open()
    dumper.represent(disasm)
    dumper.close()

def disasm_func(binary,language,functions):
    binary = Binary(binary,language)
    disasm = binary.disassemble(functions,srcmap=False)
    return disasm