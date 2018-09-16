# 0.3.3

* Battlecry now works locally (npm install --save battlecry)

# 0.3.2

* Update `casex` to 1.0.0 to support numbers.

# 0.3.1

* Add globOptions to generator file helpers
* Add globOptions to BattleCry class (used on battlecry-setup.js)
* Set default globOptions to allow listing files starting with `.` except for `._DS_Store`

# 0.3

* Variadic optional arguments (`...arg?`) become null instead of an empty array when no values are given
* Added `replaceNames` file text helper
* Fixed typo in `extractPluralizedPattern` method

# 0.2.4

* `_name_S` now outputs `userS`

# 0.2.3

* Fix issue with `__name__S` (capitalized S)

# 0.2.2

* Added pluralization and singularization

# 0.2.0 & 0.2.1

* Renamed the library from `samba` to `battlecry` to avoid confusions with the Samba Linux software.
