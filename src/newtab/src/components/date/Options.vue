<template>
  <v-container grid-list-md>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-text-field
          v-model="formatString"
          clearable
          label="Format"
        />
      </v-flex>
      <v-flex xs12>
        <v-autocomplete
          :items="formatStringItems"
          label="Append to format"
          @change="v => formatString += v"
        />
      </v-flex>

      <v-flex xs12>
        <Styling v-model="styling" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Styling from '@/components/options/Styling.vue'
import { formatDate } from '../../lib/formatDate'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { widgetsModule, DateConfig, StylingConfig, DateUpdateRate } from '@/store'

@Component({
  components: {
    Styling
  }
})
export default class DateOptions extends Vue {
  @Prop({ required: true })
  widgetId!: number

  get config (): DateConfig {
    return widgetsModule.configs[this.widgetId] as DateConfig as DateConfig
  }

  setConfig (config: Partial<DateConfig>): void {
    widgetsModule.setConfig({
      id: this.widgetId,
      config: {
        ...this.config,
        ...config
      }
    })
  }

  get styling (): StylingConfig {
    return this.config.styling
  }

  set styling (v: StylingConfig) {
    this.setConfig({ styling: v })
  }

  get formatString (): string {
    return this.config.formatString
  }

  set formatString (vRaw: string) {
    const v = vRaw || ' '
    this.setConfig({
      formatString: v,
      updateRate: this.computeUpdateRate(v)
    })
  }

  get formatStringItems (): { text: string; value: string }[] {
    return [{
      text: 'Era',
      value: 'G'
    }, {
      text: 'Era',
      value: 'GGGG'
    }, {
      text: 'Era',
      value: 'GGGGG'
    }, {
      text: 'Calendar year',
      value: 'y'
    }, {
      text: 'Calendar year',
      value: 'yo'
    }, {
      text: 'Calendar year',
      value: 'yy'
    }, {
      text: 'Calendar year',
      value: 'yyy'
    }, {
      text: 'Calendar year',
      value: 'yyyy'
    }, {
      text: 'Calendar year',
      value: 'yyyyy'
    }, {
      text: 'Local week-numbering year',
      value: 'Y'
    }, {
      text: 'Local week-numbering year',
      value: 'Yo'
    }, {
      text: 'Local week-numbering year',
      value: 'YY'
    }, {
      text: 'Local week-numbering year',
      value: 'YYY'
    }, {
      text: 'Local week-numbering year',
      value: 'YYYY'
    }, {
      text: 'Local week-numbering year',
      value: 'YYYYY'
    }, {
      text: 'ISO week-numbering year',
      value: 'R'
    }, {
      text: 'ISO week-numbering year',
      value: 'RR'
    }, {
      text: 'ISO week-numbering year',
      value: 'RRR'
    }, {
      text: 'ISO week-numbering year',
      value: 'RRRR'
    }, {
      text: 'ISO week-numbering year',
      value: 'RRRRR'
    }, {
      text: 'Extended year',
      value: 'u'
    }, {
      text: 'Extended year',
      value: 'uu'
    }, {
      text: 'Extended year',
      value: 'uuu'
    }, {
      text: 'Extended year',
      value: 'uuuu'
    }, {
      text: 'Extended year',
      value: 'uuuuu'
    }, {
      text: 'Quarter (formatting)',
      value: 'Q'
    }, {
      text: 'Quarter (formatting)',
      value: 'Qo'
    }, {
      text: 'Quarter (formatting)',
      value: 'QQ'
    }, {
      text: 'Quarter (formatting)',
      value: 'QQQ'
    }, {
      text: 'Quarter (formatting)',
      value: 'QQQQ'
    }, {
      text: 'Quarter (formatting)',
      value: 'QQQQQ'
    }, {
      text: 'Quarter (stand-alone)',
      value: 'q'
    }, {
      text: 'Quarter (stand-alone)',
      value: 'qo'
    }, {
      text: 'Quarter (stand-alone)',
      value: 'qq'
    }, {
      text: 'Quarter (stand-alone)',
      value: 'qqq'
    }, {
      text: 'Quarter (stand-alone)',
      value: 'qqqq'
    }, {
      text: 'Quarter (stand-alone)',
      value: 'qqqqq'
    }, {
      text: 'Month (formatting)',
      value: 'M'
    }, {
      text: 'Month (formatting)',
      value: 'Mo'
    }, {
      text: 'Month (formatting)',
      value: 'MM'
    }, {
      text: 'Month (formatting)',
      value: 'MMM'
    }, {
      text: 'Month (formatting)',
      value: 'MMMM'
    }, {
      text: 'Month (formatting)',
      value: 'MMMMM'
    }, {
      text: 'Month (stand-alone)',
      value: 'L'
    }, {
      text: 'Month (stand-alone)',
      value: 'Lo'
    }, {
      text: 'Month (stand-alone)',
      value: 'LL'
    }, {
      text: 'Month (stand-alone)',
      value: 'LLL'
    }, {
      text: 'Month (stand-alone)',
      value: 'LLLL'
    }, {
      text: 'Month (stand-alone)',
      value: 'LLLLL'
    }, {
      text: 'Local week of year',
      value: 'w'
    }, {
      text: 'Local week of year',
      value: 'wo'
    }, {
      text: 'Local week of year',
      value: 'ww'
    }, {
      text: 'ISO week of year',
      value: 'I'
    }, {
      text: 'ISO week of year',
      value: 'Io'
    }, {
      text: 'ISO week of year',
      value: 'II'
    }, {
      text: 'Day of month',
      value: 'd'
    }, {
      text: 'Day of month',
      value: 'do'
    }, {
      text: 'Day of month',
      value: 'dd'
    }, {
      text: 'Day of year',
      value: 'D'
    }, {
      text: 'Day of year',
      value: 'Do'
    }, {
      text: 'Day of year',
      value: 'DD'
    }, {
      text: 'Day of year',
      value: 'DDD'
    }, {
      text: 'Day of year',
      value: 'DDDD'
    }, {
      text: 'Day of week (formatting)',
      value: 'E'
    }, {
      text: 'Day of week (formatting)',
      value: 'EEEE'
    }, {
      text: 'Day of week (formatting)',
      value: 'EEEEE'
    }, {
      text: 'Day of week (formatting)',
      value: 'EEEEEE'
    }, {
      text: 'ISO day of week (formatting)',
      value: 'i'
    }, {
      text: 'ISO day of week (formatting)',
      value: 'io'
    }, {
      text: 'ISO day of week (formatting)',
      value: 'ii'
    }, {
      text: 'ISO day of week (formatting)',
      value: 'iii'
    }, {
      text: 'ISO day of week (formatting)',
      value: 'iiii'
    }, {
      text: 'ISO day of week (formatting)',
      value: 'iiiii'
    }, {
      text: 'ISO day of week (formatting)',
      value: 'iiiiii'
    }, {
      text: 'Local day of week (formatting)',
      value: 'e'
    }, {
      text: 'Local day of week (formatting)',
      value: 'eo'
    }, {
      text: 'Local day of week (formatting)',
      value: 'ee'
    }, {
      text: 'Local day of week (formatting)',
      value: 'eee'
    }, {
      text: 'Local day of week (formatting)',
      value: 'eeee'
    }, {
      text: 'Local day of week (formatting)',
      value: 'eeeee'
    }, {
      text: 'Local day of week (formatting)',
      value: 'eeeeee'
    }, {
      text: 'Local day of week (stand-alone)',
      value: 'c'
    }, {
      text: 'Local day of week (stand-alone)',
      value: 'co'
    }, {
      text: 'Local day of week (stand-alone)',
      value: 'cc'
    }, {
      text: 'Local day of week (stand-alone)',
      value: 'ccc'
    }, {
      text: 'Local day of week (stand-alone)',
      value: 'cccc'
    }, {
      text: 'Local day of week (stand-alone)',
      value: 'ccccc'
    }, {
      text: 'Local day of week (stand-alone)',
      value: 'cccccc'
    }, {
      text: 'AM, PM',
      value: 'a'
    }, {
      text: 'AM, PM',
      value: 'aaaa'
    }, {
      text: 'AM, PM',
      value: 'aaaaa'
    }, {
      text: 'AM, PM, noon, midnight',
      value: 'b'
    }, {
      text: 'AM, PM, noon, midnight',
      value: 'bbbb'
    }, {
      text: 'AM, PM, noon, midnight',
      value: 'bbbbb'
    }, {
      text: 'Flexible day period',
      value: 'B'
    }, {
      text: 'Flexible day period',
      value: 'BBBB'
    }, {
      text: 'Flexible day period',
      value: 'BBBBB'
    }, {
      text: 'Hour [1-12]',
      value: 'h'
    }, {
      text: 'Hour [1-12]',
      value: 'ho'
    }, {
      text: 'Hour [1-12]',
      value: 'hh'
    }, {
      text: 'Hour [0-23]',
      value: 'H'
    }, {
      text: 'Hour [0-23]',
      value: 'Ho'
    }, {
      text: 'Hour [0-23]',
      value: 'HH'
    }, {
      text: 'Hour [0-11]',
      value: 'K'
    }, {
      text: 'Hour [0-11]',
      value: 'Ko'
    }, {
      text: 'Hour [0-11]',
      value: 'KK'
    }, {
      text: 'Hour [1-24]',
      value: 'k'
    }, {
      text: 'Hour [1-24]',
      value: 'ko'
    }, {
      text: 'Hour [1-24]',
      value: 'kk'
    }, {
      text: 'Minute',
      value: 'm'
    }, {
      text: 'Minute',
      value: 'mo'
    }, {
      text: 'Minute',
      value: 'mm'
    }, {
      text: 'Second',
      value: 's'
    }, {
      text: 'Second',
      value: 'so'
    }, {
      text: 'Second',
      value: 'ss'
    }, {
      text: 'Fraction of second',
      value: 'S'
    }, {
      text: 'Fraction of second',
      value: 'SS'
    }, {
      text: 'Fraction of second',
      value: 'SSS'
    }, {
      text: 'Fraction of second',
      value: 'SSSS'
    }, {
      text: 'Timezone (ISO-8601 w/ Z)',
      value: 'X'
    }, {
      text: 'Timezone (ISO-8601 w/ Z)',
      value: 'XX'
    }, {
      text: 'Timezone (ISO-8601 w/ Z)',
      value: 'XXX'
    }, {
      text: 'Timezone (ISO-8601 w/ Z)',
      value: 'XXXX'
    }, {
      text: 'Timezone (ISO-8601 w/ Z)',
      value: 'XXXXX'
    }, {
      text: 'Timezone (ISO-8601 w/o Z)',
      value: 'x'
    }, {
      text: 'Timezone (ISO-8601 w/o Z)',
      value: 'xx'
    }, {
      text: 'Timezone (ISO-8601 w/o Z)',
      value: 'xxx'
    }, {
      text: 'Timezone (ISO-8601 w/o Z)',
      value: 'xxxx'
    }, {
      text: 'Timezone (ISO-8601 w/o Z)',
      value: 'xxxxx'
    }, {
      text: 'Timezone (GMT)',
      value: 'O'
    }, {
      text: 'Timezone (GMT)',
      value: 'OOOO'
    }, {
      text: 'Timezone (specific non-locat.)',
      value: 'z'
    }, {
      text: 'Timezone (specific non-locat.)',
      value: 'zzzz'
    }, {
      text: 'Seconds timestamp',
      value: 't'
    }, {
      text: 'Seconds timestamp',
      value: 'tt'
    }, {
      text: 'Milliseconds timestamp',
      value: 'T'
    }, {
      text: 'Milliseconds timestamp',
      value: 'TT'
    }, {
      text: 'Long localized date',
      value: 'P'
    }, {
      text: 'Long localized date',
      value: 'PP'
    }, {
      text: 'Long localized date',
      value: 'PPP'
    }, {
      text: 'Long localized date',
      value: 'PPPP'
    }, {
      text: 'Long localized time',
      value: 'p'
    }, {
      text: 'Long localized time',
      value: 'pp'
    }, {
      text: 'Long localized time',
      value: 'ppp'
    }, {
      text: 'Long localized time',
      value: 'pppp'
    }, {
      text: 'Combination of date and time',
      value: 'Pp'
    }, {
      text: 'Combination of date and time',
      value: 'PPpp'
    }, {
      text: 'Combination of date and time',
      value: 'PPPppp'
    }, {
      text: 'Combination of date and time',
      value: 'PPPPpppp'
    }].map(({ text, value }) => ({
      text: `${text}: ${formatDate(1111, value)}`,
      value
    }))
  }

  computeUpdateRate (format: string): DateUpdateRate {
    const d1 = new Date(0)
    const d2 = new Date(d1)

    function doDateStringsDiffer () {
      return formatDate(d1, format) !== formatDate(d2, format)
    }

    d2.setMilliseconds(9)
    if (doDateStringsDiffer()) {
      return DateUpdateRate.Milliseconds
    }

    d2.setMilliseconds(99)
    if (doDateStringsDiffer()) {
      return DateUpdateRate.Centiseconds
    }

    d2.setMilliseconds(999)
    if (doDateStringsDiffer()) {
      return DateUpdateRate.Deciseconds
    }

    d2.setSeconds(59)
    if (doDateStringsDiffer()) {
      return DateUpdateRate.Seconds
    }

    d2.setMinutes(59)
    if (doDateStringsDiffer()) {
      return DateUpdateRate.Minutes
    }

    d2.setHours(23)
    if (doDateStringsDiffer()) {
      return DateUpdateRate.Hours
    }

    return DateUpdateRate.Days
  }
}
</script>

<style scoped>
</style>
