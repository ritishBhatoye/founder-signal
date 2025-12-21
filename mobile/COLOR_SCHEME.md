# FounderOps Color Scheme

## 🎨 Updated Dark Theme (Visible & Modern)

### Background Colors

```
bg:     #0F172A  (Slate 900) - Main background - Much lighter than black
card:   #1E293B  (Slate 800) - Card backgrounds - Clearly visible
border: #334155  (Slate 700) - Card borders - Defined edges
```

### Text Colors

```
text:       #F1F5F9  (Slate 100) - Primary text - High contrast white
textMuted:  #94A3B8  (Slate 400) - Secondary text - Clear gray
textDark:   #64748B  (Slate 500) - Tertiary text - Darker gray
```

### Status Colors

```
success: #10B981  (Emerald 500) - Green for positive metrics
warning: #F59E0B  (Amber 500)   - Orange for warnings
danger:  #EF4444  (Red 500)     - Red for alerts
```

### Brand Colors

```
stripe:  #635BFF  (Stripe Purple) - Stripe integration
primary: #3B82F6  (Blue 500)      - Primary actions
```

## 🔍 Before vs After

### Before (Too Dark)

- bg: #030712 - Almost pure black, hard to see
- card: #020617 - Barely visible from background
- text: #E5E7EB - Low contrast

### After (Visible & Modern)

- bg: #0F172A - Slate 900, clearly visible
- card: #1E293B - Slate 800, distinct from background
- text: #F1F5F9 - Bright white, high contrast

## 📱 Visual Hierarchy

```
┌─────────────────────────────────┐
│  #0F172A (Background)           │
│  ┌───────────────────────────┐  │
│  │ #1E293B (Card)            │  │
│  │                           │  │
│  │ #F1F5F9 (Primary Text)    │  │
│  │ #94A3B8 (Muted Text)      │  │
│  │                           │  │
│  │ ┌─────────────────────┐   │  │
│  │ │ #10B981 (Success)   │   │  │
│  │ └─────────────────────┘   │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## ✅ Accessibility

- **Contrast Ratio:**

  - Text on bg: 15.8:1 (AAA)
  - Text on card: 13.2:1 (AAA)
  - Muted text on bg: 7.1:1 (AA)

- **Readability:** High contrast ensures text is easily readable
- **Depth:** Clear visual separation between layers
- **Status Colors:** Vibrant enough to be noticed immediately

## 🎯 Usage Examples

### Dashboard Card

```tsx
<View style={{ backgroundColor: colors.card }}>
  <Text style={{ color: colors.text }}>$4,280</Text>
  <Text style={{ color: colors.textMuted }}>MRR</Text>
</View>
```

### Success Metric

```tsx
<View style={{ backgroundColor: colors.success + "20" }}>
  <Ionicons color={colors.success} />
  <Text style={{ color: colors.success }}>+$320</Text>
</View>
```

### Alert Card

```tsx
<View
  style={{
    backgroundColor: colors.card,
    borderColor: colors.danger + "40",
  }}
>
  <Text style={{ color: colors.text }}>Revenue Drop</Text>
  <Text style={{ color: colors.textMuted }}>5% decrease</Text>
</View>
```

## 🚀 Result

The app now has:

- ✅ Clear visual hierarchy
- ✅ High contrast text
- ✅ Visible card boundaries
- ✅ Modern dark theme aesthetic
- ✅ Professional appearance
- ✅ Easy to read at a glance

**No more pure black screens!** The app is now visually appealing and functional.
