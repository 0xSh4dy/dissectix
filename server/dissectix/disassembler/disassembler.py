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

def get_mangled_function_name(function_name,binary_path,language):
    # No name mangling in case of C
    if language == "c":
        return function_name
    binary_name = binary_path.split("/")[-1]
    binary = Binary(binary_path,language)
    functions = binary.get_functions()
    search_pattern = ""
    # Return mangled names for Rust, C++ and GO
    if language == "rust":
        search_pattern = "_ZN"
        search_pattern += str(len(binary_name))+binary_name
        search_pattern += str(len(function_name))+function_name
    
    elif language == "cpp":
        if function_name == "main":
            return "main"
        search_pattern = "_Z"
        search_pattern += str(len(function_name))+function_name

    elif language == "go":
        pass

    for function in functions:
        idx = str(function).find(search_pattern)
        if idx==0:
            return function
    return ''    

