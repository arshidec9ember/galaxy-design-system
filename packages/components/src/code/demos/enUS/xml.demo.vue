<markdown>
  # XML Code Block
  It can show xml code in the code block.
</markdown>

<template>
  <div style="overflow: auto">
    <z-code :code="code" language="xml" show-line-numbers />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('xml', xml)

export default defineComponent({
  setup () {
    return {
      code: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:ReqPay
    xmlns:ns2="http://npci.org/upi/schema/">
    <Head ver="2.0" ts="2023-03-03T10:12:25+05:30" orgId="NPCI" msgId="UCZ804085beebec44a48d2728c37a29efc5"/>
    <Meta>
        <Tag name="PAYREQSTART" value="2023-03-03T10:12:25+05:30"/>
        <Tag name="PAYREQEND" value="2023-03-03T10:12:25+05:30"/>
    </Meta>
    <Txn id="UCZ493eec912ac940468372124395ef74ad" note="BE47" refId="306210633563" refUrl="www.test.co.in" ts="2023-03-03T10:12:25+05:30" type="CREDIT" orgTxnId="UCZb63baf38219c4b43b4dba646f8583c68" custRef="306210633563" orgRrn="303914241827" initiationMode="00" subType="REFUND" purpose="00">
        <RiskScores>
            <Score provider="NPCI" type="TXNRISK" value="00030"/>
        </RiskScores>
    </Txn>
    <Payer addr="tester@mypsp" name="Tester2" seqNum="1" type="PERSON" code="0000">
        <Info>
            <Identity type="ACCOUNT" verifiedName="BE47" id="123123123123"/>
            <Rating verifiedAddress="TRUE"/>
        </Info>
        <Device>
            <Tag name="TYPE" value="MOB"/>
            <Tag name="MOBILE" value="919999888898"/>
            <Tag name="LOCATION" value="hYd"/>
            <Tag name="IP" value="100.20.10.1"/>
            <Tag name="ID" value="245345355656Axhg245"/>
            <Tag name="OS" value="Android 8.0"/>
            <Tag name="APP" value="com.colive.npci"/>
            <Tag name="GEOCODE" value="17.5221503,78.3045558"/>
            <Tag name="CAPABILITY" value="12345678901234567890123456789012345"/>
        </Device>
        <Ac addrType="ACCOUNT">
            <Detail name="ACTYPE" value="SAVINGS"/>
            <Detail name="ACNUM" value="123123123123"/>
            <Detail name="IFSC" value="MYPS0123456"/>
        </Ac>
        <Amount value="800.00" curr="INR"/>
        <Merchant>
            <Identifier subCode="1520" mid="450001" sid="1520" tid="78654" merchantType="SMALL" merchantGenre="OFFLINE" onBoardingType="AGGREGATOR"/>
            <Name brand="olive" legal="Indian" franchise="olive"/>
            <Ownership type="PRIVATE"/>
        </Merchant>
    </Payer>
    <Payees>
        <Payee addr="sanket@bomh" name="Sanket" seqNum="1" type="PERSON" code="0000">
            <Info>
                <Identity type="ACCOUNT" verifiedName="Sanket" id="00000068019180464"/>
                <Rating verifiedAddress="TRUE"/>
            </Info>
            <Ac addrType="ACCOUNT">
                <Detail name="ACTYPE" value="SAVINGS"/>
                <Detail name="ACNUM" value="00000068019180464"/>
                <Detail name="IFSC" value="MAHB0001594"/>
            </Ac>
            <Amount value="800.00" curr="INR"/>
        </Payee>
    </Payees>
</ns2:ReqPay>`
    }
  }
})
</script>
