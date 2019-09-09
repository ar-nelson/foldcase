BEGIN { FS="; " }
/^#/ {}
$2 == "C" { C[$1] = $3 }
$2 == "F" { F[$1] = $3 }
$2 == "S" { S[$1] = $3 }
END {
  printf "function CaseTable() {}\n";
  printf "CaseTable.prototype = ";
  printTable(C);
  printf ";\n";
  printf "const full = Object.assign(new CaseTable(), ";
  printTable(F);
  printf ");\n"
  printf "const simple = Object.assign(new CaseTable(), ";
  printTable(S);
  printf ");\n"
  printf "module.exports = { full, simple };\n"
}

function printTable(table) {
  printf "{\n";
  for (k in table) {
    printf "  \"%s\": \"%s\",\n", escape(k), escapeMany(table[k]);
  }
  printf "}"
}

function escape(hex) {
  if (length(hex) > 4) {
    return sprintf("\\u{%s}", hex);
  } else {
    return sprintf("\\u%s", hex);
  }
}

function escapeMany(hexes) {
  out = "";
  split(hexes, arr, " ");
  for (hex in arr) {
    out = out escape(arr[hex]);
  }
  return out;
}
