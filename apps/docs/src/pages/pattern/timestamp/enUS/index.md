# Timestamp

The GDS timestamp pattern provides guidelines and recommendations for displaying date and time data. It is formulated for Zeta's product experiences.

## Date Format

The date format is based on the geography of the product setup. i.e., it is not based on the user’s current location. A user can be an American, using the product in India during their visit. It is also not based simply on the customer. A customer could have an office in India and the US. Therefore it is based on the geographical instance of the product deployment.

* **India**  
  _Format_: \<dd\> \<mmm\> \<yyyy\>  
  _Example 1_: 06 Dec 2022 (default)  
  _Example 2_: 06 DEC 2022  

* **USA**  
  _Format_: \<mmm\> \<dd\>, \<yyyy\>  
  _Example 1_: Dec 06, 2022 (default)  
  _Example 2_: DEC 06, 2022  

* **Other Countries**  
  Please refer to the [date format by country](https://en.wikipedia.org/wiki/Date_format_by_country).

**NOTE**: By default, the month is Capitalized. But it could be converted to UPPER CAPS when required to set the visual hierarchy and emphasis based on the context of the interface.

### Avoid

* 06~~/12/~~2022, 06~~-12-~~2022, 06~~.12.~~2022  
  Avoid displaying the month in numerical form. It increases the cognitive load and can cause confusion between the day and the month.

* 06 Dec ~~22~~  
  Avoid displaying the year as two digits only. The four-digit format helps the users focus on either the three elements of date by creating an unequal visual format for all three. The same visual strength causes the eye to jump between the two elements as they compete for equal attention.

* 06~~th~~ Dec 2022  
  Avoid using ordinals. They add not-so-helpful weight to the date and increase its visual parsing complexity.

* 06 Dec~~ember~~ 2022  
  Avoid using the full names of the months. They add unnecessary characters to the date. The three letters are self-sufficient to convey the month and are easier to parse visually.

* ~~6~~ Dec 2022  
  Avoid using single digits for the days. Add a leading zero instead. In list views like tables, not having the zero creates a zig-zag visual pattern, which is not helpful in the date displays.

## Time Format

### 12 Hour Format

* **Without Seconds**  
  _Format_: \<HH\>:\<MM\> \<AM/PM\>  
  _Example_: 06:55 PM  

* **With Seconds**  
  _Format_: \<HH\>:\<MM\>:\<SS\> \<AM/PM\>  
  _Example_: 06:55:12 PM  

**NOTE**: The am and pm could be used either in UPPER CAPS or lower caps to set the visual hierarchy and emphasis based on the context of the interface.

### 24 Hour Format

* **Without Seconds**  
  _Format_: \<HH\>:\<MM\>  
  _Example_: 18:55  

* **With Seconds**  
  _Format_: \<HH\>:\<MM\>:\<SS\>  
  _Example_: 18:55:12  

### Based on Country

* In India, both formats are commonly followed.
* In the US, the 12-hour format is almost exclusively followed.

### Avoid

* 06 ~~hr~~ 55 ~~min~~  
  Avoid adding the strings “hr”, “hours”, “min”, “minutes”, “sec” or “seconds” to denote the type of time attribute. It adds unnecessary characters and consumes space. Unless displaying durations like a transaction took 01 min 03 sec to complete. The clock time is well understood with the hh:mm:ss format.

* 06.55, 06~~-~~55  
  Avoid the . dash - or any other type of separator. The colon : is the standard indicator used between hour, minute and seconds.

* ~~6~~:~~5~~  
  Avoid using single digits for all three time attributes. Add a leading zero instead. In list views like tables, not having the zero creates a zig-zag visual pattern, which is not helpful in the time displays.

* 06:55 P.M., 06:55 p m, 06:55 p.m.  
  Avoid using a decimal or a space between the alphabets in the AM and PM abbreviations. They are self-sufficient and clearly and commonly understood without the decimals. The decimals add a bit of visual noise that doesn’t help much with the meaning.

* 06:55 Pm  
  Avoid using Capitalization in the AM and PM notations. Since the letters A, P, and M are abbreviations, they carry equal weightage. Therefore either both the characters should be in UPPER CAPS or both in lower caps.

* 05:55pm, 06:55PM  
  Avoid displaying the AM and PM without a space after the time numeral. The absence of a space makes it hard to visually scan.

## Date & Time Format

_Format_: \<date\>, \<time\>  
(where the \<date\> and \<time\> follows the respective format as described above)  
_Example_: 06 Dec 2022, 06:55 PM
